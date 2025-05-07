using PaginaAtletismo_Backend.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;



var builder = WebApplication.CreateBuilder(args);

// Agregar servicios al contenedor
builder.Services.AddControllers();

builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Mi API", Version = "v1" });
});

// Configurar Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("CadenaSQL"));
});

// Configurar CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("PermitirAngular", policy =>
    {
        policy.WithOrigins("http://localhost:4200") // Permitir solicitudes desde Angular
              .AllowAnyHeader()  // Permitir cualquier encabezado HTTP
              .AllowAnyMethod(); // Permitir cualquier método (GET, POST, etc.)
    });
});



var app = builder.Build();

// Aplicar la política de CORS antes de los controladores
app.UseCors("PermitirAngular");

app.UseHttpsRedirection();
app.UseRouting();
app.UseAuthorization();

if (app.Environment.IsDevelopment() || app.Environment.IsProduction()) // Habilitar en producción si es necesario
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Mi API V1");
    });
}

app.MapStaticAssets();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}")
    .WithStaticAssets();

// Middleware para redirigir automáticamente a Swagger cuando se accede a la raíz
app.Use(async (context, next) =>
{
    if (context.Request.Path == "/")
    {
        context.Response.Redirect("/swagger");
        return;
    }
    await next();
});

app.Run();
