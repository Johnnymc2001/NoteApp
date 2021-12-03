using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using API.Data;
using API.Helpers;
using API.Interfaces;
using API.Repositories;
using API.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace API.Extensions
{
	public static class ApplicationServiceExtensions
	{
		public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
		{
			services.AddControllers();

			services.AddDbContext<DataContext>(
				opt => opt.UseNpgsql(config.GetConnectionString("Default"))
			);
			services.AddScoped<IUserRepository, UserRepository>();
			services.AddScoped<INoteRepository, NoteRepository>();

			services.AddScoped<ITokenService, TokenService>();

			services.AddAutoMapper(typeof(AMProfiles).Assembly);

			return services;
		}
	}
}