using AutoMapper;
using WebApi.Models;
using WebApi.ViewModels;

namespace WebApi.Mapper
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<GameModel, Game>().ReverseMap();
            CreateMap<AuthModel, User>().ReverseMap();
            CreateMap<CommentModel, Comment>().ReverseMap();
        }   
    }
}
