using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using WebApi.Database;
using WebApi.Interfaces;
using WebApi.Models;

namespace WebApi.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly DatabaseContext database;

        public UserRepository(DatabaseContext database)
        {
            this.database = database;
        }

        public async Task Delete(User user)
        {
            database.Users.Remove(user);
            await database.SaveChangesAsync();
        }

        public async Task<User> Get(Guid id)
        {
            return await database.Users
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<IEnumerable<User>> GetAll()
        {
            return await database.Users
                .AsNoTracking()
                .ToListAsync();
        }
    }
}
