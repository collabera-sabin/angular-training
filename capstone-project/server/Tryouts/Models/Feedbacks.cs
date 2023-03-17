namespace LMS.Models
{
    public class Feedbacks
    {
        public long Id { get; set; }
        public long TrainingID { get; set; }  // Foreign key
        public Trainings? Training { get; set; }
        public long UserID { get; set; }  // Foreign key
        public Users? User { get; set; }
        public string Feedback { get; set; }
        public DateTime When { get; set; }
        public bool Attended { get; set; } = false;
    }
}