using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
/*
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
*/
using LMS.Models;
using Microsoft.AspNetCore.Authorization;
//using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Security.Claims;

namespace LMS.Controllers
{
    public class LoginDto {
        public string Username { get; set; }
        public string Password { get; set; }
    }

    public class RegisterDto
    {
        [Required]
        [StringLength(50)]
        public string Name { get; set; }

        [Required]
        [StringLength(50)]
        public string Username { get; set; }

        [Required]
        [StringLength(100, MinimumLength = 8)]
        public string Password { get; set; }
        [Required]
        [StringLength(500)]
        public string Address { get; set; }
        [Required]
        [StringLength(20)]
        public string Phone { get; set; }
    }

    public class AccountDetails {
        public string Address { get; set; }
        public string Phone { get; set; }
    }
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly AppContext _context;
        private readonly AuthService _authService;

        public UsersController(AppContext context, AuthService authService) {
            _context = context;
            _authService = authService;
        }

        [Authorize(Roles = "HR, Manager")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Users>>> GetUsers() {
            if (User.IsInRole("HR")) {
                return await _context.Users.ToListAsync();
            }
            return await _context.Users
                .Where(t => t.Role == "Student")
                .ToListAsync();
        }

        [Authorize(Roles = "HR")]
        [HttpGet("getManagers")]
        public async Task<ActionResult<IEnumerable<Users>>> GetManagers() {
            return await _context.Users
                .Where(t => t.Role == "Manager")
                .ToListAsync();
        }

        [Authorize(Roles = "HR, Manager")]
        // GET: api/Brands/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Users>> GetUser(long id) {
            Users? result;
            if (User.IsInRole("HR")) {
                result = await _context.Users.FindAsync(id);
            } else {
                result = await _context.Users
                    .Where(t => t.Role == "Student" && t.Id == id)
                    .FirstAsync();
            }

            if (result == null) {
                return NotFound();
            }

            return result;
        }

        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [Authorize(Roles = "HR")]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, Users item) {
            if (id != item.Id) {
                return BadRequest();
            }

            _context.Entry(item).State = EntityState.Modified;

            try {
                await _context.SaveChangesAsync();
            } catch (DbUpdateConcurrencyException) {
                if (!UserExists(id)) {
                    return NotFound();
                } else {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpGet("details")]
        public async Task<ActionResult<AccountDetails>> GetOwnAccountDetails() {
            long currentUserId = long.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            return await _context.Users
                .Where(u => u.Id == currentUserId)
                .Select(u => new AccountDetails {
                    Address = u.Address,
                    Phone = u.Phone,
                })
                .FirstAsync();
        }

        [HttpPut("details")]
        public async Task<IActionResult> ChangeAccountDetails(AccountDetails details) {
            long currentUserId = long.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            var user = _context.Users.Find(currentUserId);
            if (user == null) {
                BadRequest();
            }
            user.Address = details.Address;
            user.Phone = details.Phone;
            _context.Entry(user).State = EntityState.Modified;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [Authorize(Roles = "HR")]
        [HttpPost]
        public async Task<ActionResult<Users>> PostUser(Users item) {
            byte[] passwordHash, passwordSalt;
            this._authService.CreatePasswordHash("temporary", out passwordHash, out passwordSalt);
            item.PasswordHash = Convert.ToBase64String(passwordHash);
            item.PasswordSalt = Convert.ToBase64String(passwordSalt);

            _context.Users.Add(item);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUser", new { id = item.Id }, item);
        }

        [Authorize(Roles = "HR")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(long id) {
            var item = await _context.Users.FindAsync(id);
            if (item == null) {
                return NotFound();
            }

            _context.Users.Remove(item);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserExists(long id) {
            return _context.Users.Any(e => e.Id == id);
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> AuthenticateAsync([FromBody] LoginDto login) {
            var user = await _authService.AuthenticateAsync(login.Username, login.Password);

            if (user == null)
                return Unauthorized();

            var token = _authService.GenerateJwtTokenAsync(user);
            Console.WriteLine(token);

            return Ok( new { token });
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto model) {
            var result = await _authService.RegisterAsync(model.Name, model.Username, model.Password, model.Address, model.Phone, "Guest");

            if (result is Users)
                return Ok(true);
            
            return Ok(false);
        }
    }
}
