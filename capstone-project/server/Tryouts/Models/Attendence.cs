namespace LMS.Models
{
    public class Attendence
    {
        public long Id { get; set; }
        public Users? Student { get; set; }
        public long? StudentID { get; set; }     // Foreign key
        public Users? Teacher { get; set; }
        public long? teacherID { get; set; }     // Foreign key
        public Users? Manager { get; set; }
        public long? managerID { get; set; }     // Foreign key
        public Trainings? Training { get; set; }
        public long trainingID { get; set; }    // Foreign key
        public sbyte? approved { get; set; } = -1;
    }
}
