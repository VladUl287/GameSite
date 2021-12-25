using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using WebApi.Models;

namespace WebApi.Interfaces
{
    public interface IUserRepository
    {
        Task<User> Get(Guid id);
        Task<IEnumerable<User>> GetAll();
        Task Delete(User user);
    }
}
