using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTO;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories
{
	public class NoteRepository : INoteRepository
	{
		private readonly DataContext _context;
		private readonly IMapper _mapper;

		public NoteRepository(DataContext context, IMapper mapper)
		{
			this._mapper = mapper;
			this._context = context;
		}

		public async Task AddAsync(Note note)
		{
			await _context.Notes.AddAsync(note);
		}

		public async Task<Note> GetNoteByIdAsync(int id)
		{

			return await _context.Notes.AsNoTracking().FirstOrDefaultAsync(note => note.Id == id);
		}

		public async Task<PagedList<NoteDTO>> GetNotesByUserAsync(int userId, PaginationParams pageParams)
		{
			var query = _context.Notes.AsQueryable();

			query = query.Where(note => note.userId == userId).OrderByDescending(note => note.CreatedAt);

			return await PagedList<NoteDTO>.CreateAsync(query.ProjectTo<NoteDTO>(_mapper.ConfigurationProvider).AsNoTracking(), pageParams.PageNumber, pageParams.PageSize);

		}

		public async Task<bool> UpdateNote(Note note)
		{
			var noteDb = await GetNoteByIdAsync(note.Id);
			if (noteDb == null) return false;
			_context.Entry<Note>(note).State = EntityState.Modified;
			return await SaveAllAsync();
		}
		public async Task<bool> DeleteNote(int id)
		{
			var note = await GetNoteByIdAsync(id);
			if (note == null) return false;
			_context.Entry<Note>(note).State = EntityState.Deleted;
			return await SaveAllAsync();
		}

		public async Task<bool> SaveAllAsync()
		{
			return await _context.SaveChangesAsync() > 0;
		}
	}
}