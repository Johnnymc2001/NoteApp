using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;

namespace API.Interfaces
{
    public interface INoteRepository
    {
		Task AddAsync(Note note);
        Task<bool> SaveAllAsync();
        Task<Note> GetNoteByIdAsync(int id);
        Task<IEnumerable<Note>> GetNotesByUserAsync(int id);
    }
}