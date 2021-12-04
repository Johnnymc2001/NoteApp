using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace API.Extensions
{
	public static class ClaimsIdentifyExtensions
	{
		public static string GetUsername(this ClaimsPrincipal user)
		{
			return user.FindFirst(ClaimTypes.Name)?.Value;
		}

		public static int GetId(this ClaimsPrincipal user)
		{
			try
			{
				return int.Parse(user.FindFirst(ClaimTypes.NameIdentifier)?.Value);
			} catch {
				return 0;
			}
		}

	}
}