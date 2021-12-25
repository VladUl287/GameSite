using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Database;
using WebApi.Interfaces;
using WebApi.Models;

namespace WebApi.Repositories
{
    public class CommentRepository : ICommentRepository
    {
        private readonly DatabaseContext databaseContext;

        public CommentRepository(DatabaseContext databaseContext)
        {
            this.databaseContext = databaseContext;
        }

        public async Task Create(Comment comment)
        {
            await databaseContext.Comments.AddAsync(comment);
            await databaseContext.SaveChangesAsync();
        }

        public async Task Delete(Comment comment)
        {
            databaseContext.Comments.Remove(comment);
            await databaseContext.SaveChangesAsync();
        }

        public async Task<Comment> Get(int id)
        {
            return await databaseContext.Comments.FindAsync(id);
        }

        public async Task<object> Get(Guid gameId, Guid userId)
        {
            return await databaseContext.Comments
                .AsNoTracking()
                .Select(x => new { x.GameId, x.UserId })
                .FirstOrDefaultAsync(x => x.GameId == gameId && x.UserId == userId);
        }

        public async Task<IEnumerable<Comment>> GetAll()
        {
            return await databaseContext.Comments
                .AsNoTracking()
                .ToListAsync();
        }

        public async Task Update(Comment comment)
        {
            databaseContext.Comments.Update(comment);
            await databaseContext.SaveChangesAsync();
        }
    }
}
