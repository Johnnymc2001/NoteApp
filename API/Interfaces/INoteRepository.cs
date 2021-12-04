using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTO;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface INoteRepository
    {
		Task AddAsync(Note note);
        Task<bool> SaveAllAsync();
        Task<Note> GetNoteByIdAsync(int id);
        Task<PagedList<NoteDTO>> GetNotesByUserAsync(int userId, PaginationParams pageParams);
		Task<bool> DeleteNote(int id);
    }
}