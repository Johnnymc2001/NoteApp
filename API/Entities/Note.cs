using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
	public class Note
	{
		public int Id { get; set; }
		public string Title { get; set; }
		public string Content { get; set; }
		public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;
		public string Tags { get; set; }
		public bool PublicAccess { get; set; } = false;

		public User user { get; set; }
		public int userId { get; set; }
	}
}