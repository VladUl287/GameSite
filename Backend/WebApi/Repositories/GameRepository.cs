using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Database;
using WebApi.Interfaces;
using WebApi.Models;
using WebApi.ViewModels;

namespace WebApi.Repositories
{
    public class GameRepository : IGameRepository
    {
        private readonly DatabaseContext databaseContext;

        public GameRepository(DatabaseContext databaseContext)
        {
            this.databaseContext = databaseContext;
        }

        public async Task<Game> Get(Guid id)
        {
            return await databaseContext.Games.FindAsync(id);
        }

        public async Task<Game> GetFull(Guid id)
        {
            return await databaseContext.Games
                .AsNoTracking()
                .Include(x => x.Genre)
                .Include(x => x.Comments)
                .AsSplitQuery()
                .FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<IEnumerable<Game>> GetByGenre(int id)
        {
            return await databaseContext.Games
                .AsNoTracking()
                .Where(x => x.GenreId == id)
                .ToListAsync();
        }

        public async Task<IEnumerable<Game>> GetAll()
        {
            return await databaseContext.Games
                .AsNoTracking()
                .ToListAsync();
        }

        public async Task<IEnumerable<SearchGameModel>> Search(string name)
        {
            return await databaseContext.Games
                .AsNoTracking()
                .Select(x => new SearchGameModel { Id = x.Id, Name = x.Name })
                .Where(x => EF.Functions.Like(x.Name, $"%{name}%"))
                .Take(10)
                .ToListAsync();
        }

        public async Task Create(Game game)
        {
            await databaseContext.Games.AddAsync(game);
            await databaseContext.SaveChangesAsync();
        }

        public async Task Delete(Game game)
        {
            databaseContext.Games.Remove(game);
            await databaseContext.SaveChangesAsync();
        }

        public async Task Update(Game game)
        {
            databaseContext.Games.Update(game);
            await databaseContext.SaveChangesAsync();
        }
    }
}
