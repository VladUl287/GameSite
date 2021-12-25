using System;
using System.ComponentModel.DataAnnotations;
using WebApi.Attributes;

namespace WebApi.ViewModels
{
    public class CommentModel
    {
        [Required]
        [MinMax(1, 10)]
        public double Rating { get; set; }
        [Required]
        public string Text { get; set; }
        [Required]
        public Guid GameId { get; set; }
        [Required]
        public Guid UserId { get; set; }
        [Required]
        public string UserEmail { get; set; }
    }
}
