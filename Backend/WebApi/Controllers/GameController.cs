using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using WebApi.Interfaces;
using WebApi.Models;
using WebApi.ViewModels;

namespace WebApi.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class GameController : ControllerBase
    {
        private readonly IGameRepository gameRepository;
        private readonly IMapper mapper;

        public GameController(IGameRepository gameRepository, IMapper mapper)
        {
            this.gameRepository = gameRepository;
            this.mapper = mapper;
        }

        [HttpGet]
        public async Task<IEnumerable<Game>> GetAll()
        {
            return await gameRepository.GetAll();
        }

        [HttpGet]
        [Route("genre/{genreId}")]
        public async Task<IEnumerable<Game>> GetByGenre(int genreId)
        {
            return await gameRepository.GetByGenre(genreId);
        }

        [HttpGet]
        [Route("name/{name}")]
        public async Task<IEnumerable<SearchGameModel>> GetByName(string name)
        {
            return await gameRepository.Search(name);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Game>> Get(Guid id)
        {
            var game = await gameRepository.GetFull(id);

            if (game is null)
            {
                return NotFound();
            }

            return Ok(game);
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Create([FromForm] GameModel createGame)
        {
            var game = mapper.Map<Game>(createGame);
            game.Poster = await ImageToByteArray(createGame.Image);

            await gameRepository.Create(game);

            return CreatedAtAction("Create", game);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Update(Guid id, GameModel gameIn)
        {
            var game = await gameRepository.Get(id);

            if (game is null)
            {
                return NotFound();
            }

            game.Name = gameIn.Name;
            game.Description = gameIn.Description;
            game.Poster = await ImageToByteArray(gameIn.Image);
            game.ReleaseDate = gameIn.ReleaseDate;
            game.GenreId = gameIn.GenreId;

            await gameRepository.Update(game);

            return NoContent();
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var game = await gameRepository.Get(id);

            if (game is not null)
            {
                await gameRepository.Delete(game);
            }

            return NoContent();
        }

        private static async Task<byte[]> ImageToByteArray(IFormFile file)
        {
            //if(file.Length < 2097152)
            using var memoryStream = new MemoryStream();
            await file.CopyToAsync(memoryStream);
            return memoryStream.ToArray();
        }
    }
}
