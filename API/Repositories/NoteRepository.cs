using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories
{
	public class NoteRepository : INoteRepository
	{
		private readonly DataContext _context;

		public NoteRepository(DataContext context)
		{
			this._context = context;
		}

		public async Task AddAsync(Note note)
		{
			await _context.Notes.AddAsync(note);
		}

		public async Task<Note> GetNoteByIdAsync(int id)
		{
			return await _context.Notes.FirstOrDefaultAsync(note => note.Id == id);
		}

		public async Task<IEnumerable<Note>> GetNotesByUserAsync(int userId)
		{
			return await _context.Notes.Where(note => note.userId == userId).ToListAsync();

		}

		public async Task<bool> SaveAllAsync()
		{
			return await _context.SaveChangesAsync() > 0;
		}
	}
}