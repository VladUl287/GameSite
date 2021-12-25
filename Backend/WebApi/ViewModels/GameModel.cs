using Microsoft.AspNetCore.Http;
using System;
using System.ComponentModel.DataAnnotations;

namespace WebApi.ViewModels
{
    public class GameModel
    {
        [Required]
        [MaxLength(150)]
        public string Name { get; set; }
        [Required]
        [MaxLength(2500)]
        public string Description { get; set; }
        [Required]
        public IFormFile Image { get; set; }
        [Required]
        public DateTime ReleaseDate { get; set; }
        [Required]
        public int GenreId { get; set; }
    }
}