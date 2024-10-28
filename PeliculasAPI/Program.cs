using Microsoft.EntityFrameworkCore;
using PeliculasAPI;
using PeliculasAPI.Servicios;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


builder.Services.AddAutoMapper(typeof(Program));

builder.Services.AddDbContext<ApplicationDbContext>(opciones => 
    opciones.UseSqlServer("name=DefaultConnection"));

builder.Services.AddOutputCache(opciones =>
{
    opciones.DefaultExpirationTimeSpan = TimeSpan.FromSeconds(60);
});

var origenesPermitidos = builder.Configuration.GetValue<string>("origenesPermitidos")!.Split(",");


builder.Services.AddCors(opciones =>
 {
         opciones.AddDefaultPolicy(opcionesCORS =>
         {
             opcionesCORS.WithOrigins(origenesPermitidos).AllowAnyMethod().AllowAnyHeader()
             .WithExposedHeaders("Cantidad-total-registros");
         });
 });

builder.Services.AddTransient<IAlmacenadorArchivos, AlmacenadorArchivosLocal>();

//SI FUERA CON SERVIDOR AZURE
//builder.Services.AddTransient<IAlmacenadorArchivos, AlmacenadorArchivosAzure>();

builder.Services.AddHttpContextAccessor();




var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();

app.UseStaticFiles();

app.UseCors();

app.UseAuthorization();

app.MapControllers();

app.UseOutputCache();

app.Run();
