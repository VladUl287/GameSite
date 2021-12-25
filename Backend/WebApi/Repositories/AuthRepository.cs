using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using WebApi.Database;
using WebApi.Interfaces;
using WebApi.Models;

namespace WebApi.Repositories
{
    public class AuthRepository : IAuthRepository
    {
        private readonly DatabaseContext database;

        public AuthRepository(DatabaseContext database)
        {
            this.database = database;
        }

        public async Task Create(User user)
        {
            await database.Users.AddAsync(user);
            await database.SaveChangesAsync();
        }

        public async Task<User> GetByEmail(string email)
        {
            return await database.Users
                .AsNoTracking()
                .Include(e => e.Role)
                .FirstOrDefaultAsync(x => x.Email == email);
        }
    }
}
