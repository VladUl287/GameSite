using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using WebApi.Database;
using WebApi.Interfaces;
using WebApi.Models;

namespace WebApi.Repositories
{
    public class GenreRepository : IGenreRepository
    {
        private readonly DatabaseContext database;

        public GenreRepository(DatabaseContext database)
        {
            this.database = database;
        }

        public async Task Create(Genre genre)
        {
            await database.Genres.AddAsync(genre);
            await database.SaveChangesAsync();
        }

        public async Task Delete(Genre genre)
        {
            database.Genres.Remove(genre);
            await database.SaveChangesAsync();
        }

        public async Task<Genre> Get(int id)
        {
            return await database.Genres.FindAsync(id);
        }

        public async Task<IEnumerable<Genre>> GetAll()
        {
            return await database.Genres
                .AsNoTracking()
                .ToListAsync();
        }
    }
}
