using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using WebApi.Interfaces;
using WebApi.Models;
using WebApi.ViewModels;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GenreController : ControllerBase
    {
        private readonly IGenreRepository genreRepository;

        public GenreController(IGenreRepository genreRepository)
        {
            this.genreRepository = genreRepository;
        }

        [HttpGet]
        [Authorize]
        public async Task<IEnumerable<Genre>> GetAll()
        {
            return await genreRepository.GetAll();
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Create(GenreModel createModel)
        {
            await genreRepository.Create(new Genre { Name = createModel.Name });

            return NoContent();
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Delete(int id)
        {
            var genre = await genreRepository.Get(id);

            if (genre is not null)
            {
                await genreRepository.Delete(genre);
            }

            return NoContent();
        }
    }
}
