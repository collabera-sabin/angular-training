using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LMS.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Security.Claims;

namespace LMS.Controllers
{
    public class TrainingsWithApplied : Trainings {
        public bool applied { get; set; }
        public sbyte? approved { get; set; }
    }

    public class TrainingsWithHistory : Trainings
    {
        public string status { get; set; }
        public bool attended { get; set; }
        public bool feedback { get; set; }
    }

    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [Route("api/[controller]")]
    [ApiController]
    public class TrainingsController : ControllerBase {
        private readonly AppContext _context;

        public TrainingsController(AppContext context) {
            _context = context;
        }

        // PUT: api/trainings/5/approve
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [Authorize(Roles = "Manager")]
        [HttpPut("{tid}/{uid}/approve")]
        public async Task<IActionResult> ApproveTraining(long tid, long uid) {
            var record = await _context.Attendence
                .Where(t => t.StudentID == uid && t.trainingID == tid)
                .FirstAsync();
            if (record == null) {
                return NotFound();
            }
            record.approved = 1;
            _context.Entry(record).State = EntityState.Modified;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // PUT: api/trainings/5/reject
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [Authorize(Roles = "Manager")]
        [HttpPut("{tid}/{uid}/reject")]
        public async Task<IActionResult> RejectTraining(long tid, long uid) {
            var record = await _context.Attendence
                .Where(t => t.StudentID == uid && t.trainingID == tid)
                .FirstAsync();
            if (record == null) {
                return NotFound();
            }
            record.approved = 0;
            _context.Entry(record).State = EntityState.Modified;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // GET: api/trainings
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TrainingsWithApplied>>> GetTrainings() {
            var now = DateTime.UtcNow;
            long currentUserId = long.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));

            return await _context.Trainings
                .Where(t => t.StartDate.AddDays(t.Scope) > now)
                .Select(t => new TrainingsWithApplied {
                    Id = t.Id,
                    Name = t.Name,
                    StartDate = t.StartDate,
                    Scope = t.Scope,
                    approved = _context.Attendence
                        .Where(f => f.trainingID == t.Id && f.StudentID == currentUserId)
                        .Select(a => a.approved)
                        .First(),
                    applied = _context.Attendence.Any(a => a.trainingID == t.Id && a.StudentID == currentUserId)
                })
                .ToListAsync();
        }

        // GET: api/trainings/all
        [HttpGet("all")]
        public async Task<ActionResult<IEnumerable<TrainingsWithHistory>>> GetAllTrainings() {
            DateTime now = DateTime.UtcNow;
            long currentUserId = long.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            if (User.IsInRole("Student")) {
                DateTime today = DateTime.UtcNow.Date;
                var trainingIds = _context.Attendence
                    .Where(a => a.StudentID == currentUserId && a.approved == 1)
                    .Select(a => a.trainingID)
                    .Distinct()
                    .ToList();

                return await _context.Trainings
                    .Where(s => trainingIds.Contains(s.Id))
                    .Select(s => new TrainingsWithHistory{
                        Id = s.Id,
                        Name = s.Name,
                        StartDate = s.StartDate,
                        Scope = s.Scope,
                        status = (s.StartDate < now)?((s.StartDate.AddDays(s.Scope) < now)? "Finished" : "Running") : "Not yet started",
                        attended = _context.Feedbacks.Any(f => f.UserID == currentUserId && f.TrainingID == s.Id && f.When == today && f.Attended == true),
                        feedback = _context.Feedbacks.Any(f => (today != s.StartDate.AddDays(s.Scope - 1)) || (f.UserID == currentUserId && f.TrainingID == s.Id && f.Feedback != "")),
                    })
                    .OrderByDescending(t => t.StartDate)
                    .ToListAsync();
            }

            return await _context.Trainings
                .Select(s => new TrainingsWithHistory {
                    Id = s.Id,
                    Name = s.Name,
                    StartDate = s.StartDate,
                    Scope = s.Scope,
                    status = (s.StartDate < now) ? ((s.StartDate.AddDays(s.Scope) < now) ? "Finished" : "Running") : "Not yet started"
                })
                .ToListAsync();
        }

        // GET: api/trainings/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Trainings>> GetTraining(long id) {
            var training = await _context.Trainings.FindAsync(id);

            if (training == null) {
                return NotFound();
            }

            return training;
        }

        // PUT: api/trainings/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [Authorize(Roles = "HR")]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTrainings(long id, Trainings training) {
            if (id != training.Id) {
                return BadRequest();
            }
            var prev = await _context.Trainings.FindAsync(id);
            var owner = await _context.Users.FindAsync(prev.OwnerID);
            if (owner == null) {
                return Unauthorized();
            }
            _context.Entry(prev).State = EntityState.Detached;
            training.Owner = owner;
            training.StartDate = DateTime.SpecifyKind(training.StartDate, DateTimeKind.Utc);
            _context.Entry(training).State = EntityState.Modified;
            try {
                await _context.SaveChangesAsync();
            } catch (DbUpdateConcurrencyException) {
                if (!TrainingExists(id)) {
                    return NotFound();
                } else {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/trainings
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [Authorize(Roles = "HR")]
        [HttpPost]
        public async Task<ActionResult<Trainings>> PostTraining(Trainings training) {
            long currentUserId = long.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            if (currentUserId != training.OwnerID) {
                return Unauthorized();
            }
            var owner = await _context.Users.FindAsync(currentUserId);
            if (owner == null || currentUserId != owner.Id) {
                return Unauthorized();
            }
            training.Owner = owner;
            training.StartDate = DateTime.SpecifyKind(training.StartDate, DateTimeKind.Utc);
            _context.Trainings.Add(training);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTraining", new { id = training.Id }, training);
        }

        // DELETE: api/trainings/5
        [Authorize(Roles = "HR")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTraining(long id) {
            var training = await _context.Trainings.FindAsync(id);
            if (training == null) {
                return NotFound();
            }
            var now = DateTime.UtcNow;

            if (training.StartDate < now) {
                var enrolledStudents = _context.Attendence.Where(a => a.trainingID == id && a.approved == 1 && a.StudentID != null).FirstOrDefault();
                if (enrolledStudents != null) {
                    return Unauthorized("The training cannot be cancelled as there are students enrolled in it.");
                }
            }

            _context.Trainings.Remove(training);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TrainingExists(long id) {
            return _context.Trainings.Any(e => e.Id == id);
        }

        [Authorize(Roles = "Student")]
        [HttpPost("{id}/apply")]
        public async Task<IActionResult> ApplyToTraining(long id) {
            var user = await _context.Users.FindAsync(long.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)));
            var attendence = new Attendence();
            attendence.Student = user;
            attendence.StudentID = user.Id;
            attendence.trainingID = id;
            attendence.Training = await _context.Trainings.FindAsync(id);

            _context.Attendence.Add(attendence);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [Authorize(Roles = "Student")]
        [HttpDelete("{id}/cancel")]
        public async Task<IActionResult> CancelTraining(long id) {
            long currentUserId = long.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            var item = _context.Attendence
                .Where(a => a.StudentID == currentUserId && a.trainingID == id)
                .FirstOrDefault();
            if (item == null) {
                return NotFound();
            }

            _context.Attendence.Remove(item);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [Authorize(Roles = "HR")]
        [HttpPost("{tid}/{mid}/assignManager")]
        public async Task<IActionResult> AssignManager(long tid, long mid) {
            var attendence = new Attendence();
            attendence.trainingID = tid;
            attendence.Training = await _context.Trainings.FindAsync(tid);
            attendence.managerID = mid;
            attendence.Manager = await _context.Users.FindAsync(mid);

            _context.Attendence.Add(attendence);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
