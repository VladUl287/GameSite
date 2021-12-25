using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using WebApi.Models;

namespace WebApi.Interfaces
{
    public interface ICommentRepository
    {
        Task<Comment> Get(int id);
        Task<object> Get(Guid gameId, Guid userId);
        Task<IEnumerable<Comment>> GetAll();
        Task Update(Comment comment);
        Task Delete(Comment comment);
        Task Create(Comment comment);
    }
}
