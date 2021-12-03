using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTO;
using API.Entities;
using AutoMapper;

namespace API.Helpers
{
    public class AMProfiles : Profile
    {
        public AMProfiles() {
			CreateMap<Note, NoteDTO>();
			CreateMap<NoteDTO, Note>();
		}
    }
}