using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using WebApi.Interfaces;
using WebApi.Models;
using WebApi.ViewModels;

namespace WebApi.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class CommentController : ControllerBase
    {
        private readonly IGameRepository gameRepository;
        private readonly ICommentRepository commentRepository;
        private readonly IMapper mapper;

        public CommentController(IGameRepository gameRepository, ICommentRepository commentRepository, IMapper mapper)
        {
            this.gameRepository = gameRepository;
            this.commentRepository = commentRepository;
            this.mapper = mapper;
        }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<IEnumerable<Comment>> Get()
        {
            return await commentRepository.GetAll();
        }

        [HttpGet("{gameId}/{userId}")]
        public async Task<bool> Get(Guid gameId, Guid userId)
        {
            return await commentRepository.Get(gameId, userId) is null;
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromForm] CommentModel commentModel)
        {
            var game = await gameRepository.Get(commentModel.GameId);

            if (game is null)
            {
                return NotFound();
            }

            var com = await commentRepository.Get(game.Id, commentModel.UserId);

            if (com is not null)
            {
                return BadRequest("Пользователь уже оставлял коментарий к этой игре.");
            }

            var comment = mapper.Map<Comment>(commentModel);
            await commentRepository.Create(comment);

            game.Rating += comment.Rating;
            game.CountReviews += 1;
            await gameRepository.Update(game);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var comment = await commentRepository.Get(id);

            if (comment is not null)
            {
                var game = await gameRepository.Get(comment.GameId);
                game.Rating -= comment.Rating;
                game.CountReviews -= 1;

                await commentRepository.Delete(comment);
            }

            return NoContent();
        }
    }
}
