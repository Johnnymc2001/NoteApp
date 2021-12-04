using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using API.DTO;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
	public class UserController : BaseAPIController
	{
		private readonly IUserRepository _userRep;
		private readonly ITokenService _tokenService;

		public UserController(IUserRepository userRep, ITokenService tokenService)
		{
			this._userRep = userRep;
			this._tokenService = tokenService;
		}

		[Route("register")]
		[HttpPost]
		public async Task<ActionResult<UserDTO>> Register(AuthDTO dto)
		{
			if (await _userRep.GetUserByUsernameAsync(dto.Username) != null)
			{
				return BadRequest("Username is taken");
			};

			var user = new User();

			using var hmac = new HMACSHA512();

			user.Username = dto.Username.ToLower();
			user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(dto.Password));
			user.PasswordSalt = hmac.Key;

			await _userRep.AddAsync(user);
			await _userRep.SaveAllAsync();

			return new UserDTO
			{
				Username = user.Username,
				Token = _tokenService.CreateToken(user),
			};
		}

		[Route("login")]
		[HttpPost]
		public async Task<ActionResult<UserDTO>> Login([FromBody] AuthDTO dto)
		{
			var user = await _userRep.GetUserByUsernameAsync(dto.Username);
			
			if (user == null)
			{
				return Unauthorized("Account or password is incorrect!");
			};

			using var hmac = new HMACSHA512(user.PasswordSalt);

			var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(dto.Password));

			for (int i = 0; i < computedHash.Length; i++)
			{
				if (computedHash[i] != user.PasswordHash[i]) return Unauthorized("Account or password is incorrect!");
			}
			return new UserDTO
			{
				Username = user.Username,
				Token = _tokenService.CreateToken(user),
			};
		}

		[Authorize]
		[Route("testAuth")]
		[HttpGet]
		public ActionResult TestAuth()
		{
			return Ok();
		}
	}
}