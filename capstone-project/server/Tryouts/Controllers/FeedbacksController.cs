using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using LMS.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LMS.Controllers
{
    public class FeedbackDto {
        public string feedback { get; set; } = "";
    }

    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [Route("api/[controller]")]
    [ApiController]
    public class FeedbacksController : ControllerBase
    {
        private readonly AppContext _context;

        public FeedbacksController(AppContext context) {
            _context = context;
        }

        [Authorize(Roles = "Student")]
        [HttpPost("send/{id}")]
        public async Task<IActionResult> SendFeedback(long id, FeedbackDto body) {
            DateTime today = DateTime.UtcNow.Date;
            long currentUserId = long.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            var training = await _context.Trainings.FindAsync(id);

            if (training == null) {
                return BadRequest();
            }

            var given = _context.Feedbacks.Any(f => (today != training.StartDate.AddDays(training.Scope - 1)) || (f.UserID == currentUserId && f.TrainingID == id && f.Feedback != ""));

            if (given) {
                return Unauthorized();
            }

            var user = await _context.Users.FindAsync(currentUserId);
            var feedback = new Feedbacks();
            feedback.User = user;
            feedback.UserID = user.Id;
            feedback.When = today;
            feedback.Training = training;
            feedback.TrainingID = id;
            feedback.Feedback = body.feedback;

            _context.Feedbacks.Add(feedback);
            await _context.SaveChangesAsync();
            return Ok();
        }
        private bool validateManagerOnTraining(long mid, long tid) {
            return _context.Attendence
                .Where(a => a.managerID == mid && a.trainingID == tid).Any();
        }

        [Authorize(Roles = "Manager")]
        [HttpGet("view/{uid}/{tid}")]
        public async Task<ActionResult<IEnumerable<Feedbacks>>> ViewFeedbacks(long uid, long tid) {
            long mid = long.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));

            if (!validateManagerOnTraining(mid, tid)) {
                return Unauthorized();
            }

            return await _context.Feedbacks
                .Where(f => f.UserID == uid && f.TrainingID == tid && f.Feedback != "")
                .ToListAsync();
        }
    }
}
