using Business.Implementations;
using Business.Interfaces;
using Microsoft.EntityFrameworkCore;
using Repository;
using Repository.Implementations;
using Repository.Interfaces;

namespace BackendAPI
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Configure CORS
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("default", policy =>
                {
                    policy.AllowAnyOrigin()
                          .AllowAnyHeader()
                          .AllowAnyMethod();
                });
            });

            // Add services to the container.
            builder.Services.AddControllers();

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddDbContext<DatabaseContext>(options =>
            {
                options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"),
                                    b => b.MigrationsAssembly("BackendAPI"));
            });

            // Repositories
            builder.Services.AddScoped<IPersonRepo, PersonRepo>();

            // Services
            builder.Services.AddScoped<IPersonService, PersonService>();
            builder.Services.AddScoped<INotificationsService, NotificationsService>();

            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseCors("default");

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}