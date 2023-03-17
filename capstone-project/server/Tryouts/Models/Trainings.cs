namespace LMS.Models
{
    public class Trainings
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public DateTime StartDate { get; set; }
        public ushort Scope { get; set; }
        public long OwnerID { get; set; } // Foreign key
        public Users? Owner { get; set; }
    }
}
