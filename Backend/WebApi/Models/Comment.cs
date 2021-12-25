using System;

namespace WebApi.Models
{
    public class Comment
    {
        public int Id { get; set; }
        public double Rating { get; set; }
        public string Text { get; set; }
        public Guid GameId { get; set; }
        public Guid UserId { get; set; }
        public string GameName { get; set; }
        public string UserEmail { get; set; }
    }
}