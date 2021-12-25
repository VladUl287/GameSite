using System;
using System.Collections.Generic;

namespace WebApi.Models
{
    public class Game
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public byte[] Poster { get; set; }
        public DateTime ReleaseDate { get; set; }
        public double Rating { get; set; }
        public int CountReviews { get; set; }
        public int GenreId { get; set; }
        public Genre Genre { get; set; }
        public ICollection<Comment> Comments { get; set; }
    }
}
