using System.Threading.Tasks;
using WebApi.Models;

namespace WebApi.Interfaces
{
    public interface IAuthRepository
    {
        Task Create(User user);
        Task<User> GetByEmail(string email);
    }
}
