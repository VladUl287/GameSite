using System.Collections.Generic;
using System.Threading.Tasks;
using WebApi.Models;

namespace WebApi.Interfaces
{
    public interface IGenreRepository
    {
        Task<IEnumerable<Genre>> GetAll();

        Task<Genre> Get(int id);

        Task Create(Genre genre);

        Task Delete(Genre genre);
    }
}
