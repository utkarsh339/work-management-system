using WorkManagement.Api.Enums;
using WorkManagement.Api.Models;
using WorkManagement.Api.Helpers;

namespace WorkManagement.Api.Data
{
    public static class DataSeeder
    {
        public static void Seed(ApplicationDbContext context)
        {
            if (context.Users.Any())
                return;

            var users = new List<User>
            {
                new User
                {
                    FullName = "Normal User",
                    Email = "user@company.com",
                    PasswordHash = PasswordHasher.Hash("User@123"),
                    Role = Role.User
                },
                new User
                {
                    FullName = "Manager User",
                    Email = "manager@company.com",
                    PasswordHash = PasswordHasher.Hash("Manager@123"),
                    Role = Role.Manager

                }
            };

            context.Users.AddRange(users);
            context.SaveChanges();
        }
    }
}
