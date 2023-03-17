using LMS;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Logging;
using System.Text.Json;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;

var builder = WebApplication.CreateBuilder(args);
IdentityModelEventSource.ShowPII = true;

// Add services to the container.
builder.Services.AddDbContext<LMS.AppContext>(options => options.UseNpgsql(builder.Configuration.GetConnectionString("postgre")));

var secret = builder.Configuration.GetValue<string>("jwtSecret");

var key = Encoding.ASCII.GetBytes(secret);
var dataService = new Data(key);
builder.Services.AddSingleton(dataService);

builder.Services.AddAuthentication(options => {
        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    }).AddJwtBearer(options => {
        options.TokenValidationParameters = new TokenValidationParameters {
            ValidateLifetime = true,
            ValidateAudience = true,
            ValidAudience = "https://localhost:7271",
            ValidateIssuer = true,
            ValidIssuer = "https://localhost:7271",
            IssuerSigningKey = dataService.Key
        };
    });

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("Guest", policy =>
    {
        policy.RequireRole(Roles.Guest.ToString());
    });

    options.AddPolicy("HR", policy =>
    {
        policy.RequireRole(Roles.HR.ToString());
    });

    options.AddPolicy("Manager", policy =>
    {
        policy.RequireRole(Roles.Manager.ToString());
    });

    options.AddPolicy("Student", policy =>
    {
        policy.RequireRole(Roles.Student.ToString());
    });
});


builder.Services.AddScoped<AuthService>();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(p => p.AddPolicy("default", build => {
    build.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
    // build.WithOrigins("https://localhost:4200").AllowAnyMethod().AllowAnyHeader();
}));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment()) {
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("default");

app.UseHttpsRedirection();

app.UseAuthorization();


app.MapControllers().RequireCors("default");

app.Run();

enum Roles
{
    Guest,
    HR,
    Manager,
    Student
}
