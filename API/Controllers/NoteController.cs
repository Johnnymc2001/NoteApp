using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using API.DTO;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace API.Controllers
{
	[Authorize]
	public class NoteController : BaseAPIController
	{
		private readonly INoteRepository _noteRepository;
		private readonly IMapper _mapper;

		public NoteController(INoteRepository noteRepository, IMapper mapper)
		{
			this._noteRepository = noteRepository;
			this._mapper = mapper;
		}

		[Route("")]
		[HttpGet]
		public async Task<ActionResult<NoteDTO>> GetNotes([FromQuery] PaginationParams pageParams)
		{
			var userId = User.GetId();
			var notes = await _noteRepository.GetNotesByUserAsync(userId, pageParams);

         Response.AddPaginationHeader(notes.CurrentPage, notes.PageSize,
                notes.TotalCount, notes.TotalPages);

			return Ok(notes);
		}

		[Route("{id}")]
		[HttpGet]
		public async Task<ActionResult<NoteDTO>> GetNote(int id)
		{
			int? userId = User.GetId();
			var note = await _noteRepository.GetNoteByIdAsync(id);

			if (note == null) return NotFound();
			if (note.userId != userId) return BadRequest("This is not your note!");

			return Ok(_mapper.Map<NoteDTO>(note));
		}

		[HttpPost]
		public async Task<ActionResult> CreateNote([FromBody] NoteDTO dto)
		{
			var userId = User.GetId();

			var note = new Note();
			note = _mapper.Map<Note>(dto);
			note.userId = userId;

			await _noteRepository.AddAsync(note);
			var result = await _noteRepository.SaveAllAsync();

			if (!result) return UnprocessableEntity("Failed to add note!");
			return NoContent();
		}
	}
}