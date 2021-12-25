using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using WebApi.Models;
using WebApi.ViewModels;

namespace WebApi.Interfaces
{
    public interface IGameRepository
    {
        Task<Game> Get(Guid id);
        Task<Game> GetFull(Guid id);
        Task<IEnumerable<Game>> GetAll();
        Task<IEnumerable<Game>> GetByGenre(int id);
        Task<IEnumerable<SearchGameModel>> Search(string name);
        Task Create(Game game);
        Task Update(Game game);
        Task Delete(Game game);
    }
}
