using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace LMS
{
    public class Data
    {
        public SecurityKey Key { get; }

        public Data(byte[] secret) {
            Key = new SymmetricSecurityKey(secret);
        }
    }
}
