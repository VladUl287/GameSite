using System;
using System.Text.Json.Serialization;

namespace WebApi.Models
{
    public class User
    {
        public Guid Id { get; set; }
        public string Email { get; set; }
        [JsonIgnore]
        public string Password { get; set; }
        [JsonIgnore]
        public int RoleId { get; set; }
        [JsonIgnore]
        public Role Role { get; set; }
    }
}
