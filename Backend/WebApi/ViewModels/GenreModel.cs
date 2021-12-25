using System.ComponentModel.DataAnnotations;

namespace WebApi.ViewModels
{
    public class GenreModel
    {
        [Required]
        [MaxLength(100)]
        public string Name { get; set; }
    }
}
