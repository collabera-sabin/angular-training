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
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [Route("api/[controller]")]
    [ApiController]
    public class AttendenceController : ControllerBase
    {
        private readonly AppContext _context;

        public AttendenceController(AppContext context) {
            _context = context;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<object>>> GetTrainingAttendence(long id) {
            var mID = long.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));

            List<long> trainingIds = new List<long>();
            if (User.IsInRole("Manager")) {
                trainingIds = _context.Attendence
                    .Where(a => a.managerID == mID)
                    .Select(a => a.trainingID)
                    .Distinct()
                    .ToList();
            } else if (User.IsInRole("Student")) {
                trainingIds = _context.Attendence
                    .Where(a => a.StudentID == mID)
                    .Select(a => a.trainingID)
                    .Distinct()
                    .ToList();
            }

            var students = _context.Attendence
                .Where(a => (User.IsInRole("HR") || trainingIds.Contains(a.trainingID)) && a.trainingID == id && a.Student != null)
                .GroupBy(a => a.Student.Name)
                .Select(g => new {
                    TrainingId = id,
                    StudentId = g.First().StudentID,
                    StudentName = g.Key,
                    Approval = g.First().approved,
                    Attendance = _context.Feedbacks
                        .Where(f => f.TrainingID == id && f.UserID == g.First().StudentID && f.Attended == true)
                        .Count(),
                    Feedbacks = _context.Feedbacks
                        .Where(f => f.TrainingID == id && f.UserID == g.First().StudentID && !string.IsNullOrEmpty(f.Feedback))
                        .Count()
                });

            return await students.ToListAsync();
        }

        [Authorize(Roles = "Student")]
        [HttpPost("mark/{id}")]
        public async Task<IActionResult> MarkAttendance(long id) {
            DateTime today = DateTime.UtcNow.Date;
            long currentUserId = long.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            var marked = _context.Feedbacks.Any(f => f.UserID == currentUserId && f.TrainingID == id && f.When == today && f.Attended == true);
            if (marked) {
                return Unauthorized("Already marked attendance for today!");
            }
            var user = await _context.Users.FindAsync(currentUserId);
            var feedback = new Feedbacks();
            feedback.User = user;
            feedback.UserID = user.Id;
            feedback.When = today;
            feedback.Training = await _context.Trainings.FindAsync(id);
            feedback.TrainingID = id;
            feedback.Attended = true;
            feedback.Feedback = "";
   
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
        public async Task<ActionResult<IEnumerable<Feedbacks>>> ViewAttendance(long uid, long tid) {
            long mid = long.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));

            if (!validateManagerOnTraining(mid, tid)) {
                return Unauthorized();
            }

            return await _context.Feedbacks
                .Where(f => f.UserID == uid && f.TrainingID == tid && f.Attended == true)
                .ToListAsync();
        }

        [Authorize(Roles = "Manager")]
        [HttpPut("set/{tid}/{fid}/{state}")]
        public async Task<IActionResult> SetAttendance(long tid, long fid, bool state) {
            long mid = long.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));

            if (!validateManagerOnTraining(mid, tid)) {
                return Unauthorized();
            }
            var prev = await _context.Feedbacks.FindAsync(fid);
            if (prev == null) {
                return BadRequest();
            }
            prev.Attended = state;
            _context.Entry(prev).State = EntityState.Modified;

            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
