namespace LMS.Models
{
    public class Users
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Role { get; set; }
        public bool IsConfirmed { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public string Username { get; set; }
        public string PasswordHash { get; set; }
        public string PasswordSalt { get; set; }
    }
}
