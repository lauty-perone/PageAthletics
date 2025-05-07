using Microsoft.AspNetCore.Mvc;
using PaginaAtletismo_Backend.Data;
using PaginaAtletismo_Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace PaginaAtletismo_Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PersonaController : ControllerBase
    {
        private readonly AppDbContext _appDbContext;

        public PersonaController(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        // [GET] Obtener una persona por ID
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var persona = await _appDbContext.Personas.FirstOrDefaultAsync(p => p.IdPersona == id);

            if (persona == null)
                return NotFound(new { message = "Persona no encontrada." }); // Respuesta HTTP 404 si no existe

            return Ok(persona); // Respuesta HTTP 200 con la persona encontrada
        }

        // [POST] Crear una nueva persona
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Persona persona)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState); // Respuesta HTTP 400 si los datos son inválidos

            await _appDbContext.Personas.AddAsync(persona);
            await _appDbContext.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = persona.IdPersona }, persona); // Respuesta HTTP 201
        }

        // [PUT] Actualizar una persona existente
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Persona persona)
        {
            var personaExistente = await _appDbContext.Personas.FirstOrDefaultAsync(p => p.IdPersona == id);

            if (personaExistente == null)
                return NotFound(new { message = "Persona no encontrada para actualizar." }); // Respuesta HTTP 404

            // Actualiza los campos necesarios
            personaExistente.Name = persona.Name;
            personaExistente.LastName = persona.LastName;
            personaExistente.Email = persona.Email;
            personaExistente.FechaNacimiento = persona.FechaNacimiento;
            personaExistente.Dni = persona.Dni;
            personaExistente.Direccion = persona.Direccion;
            personaExistente.Localidad = persona.Localidad;
            personaExistente.rol = persona.rol;

            _appDbContext.Personas.Update(personaExistente);
            await _appDbContext.SaveChangesAsync();

            return Ok(personaExistente); // Respuesta HTTP 200 con la persona actualizada
        }

        // [DELETE] Eliminar una persona
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var persona = await _appDbContext.Personas.FirstOrDefaultAsync(p => p.IdPersona == id);

            if (persona == null)
                return NotFound(new { message = "Persona no encontrada para eliminar." }); // Respuesta HTTP 404

            _appDbContext.Personas.Remove(persona);
            await _appDbContext.SaveChangesAsync();

            return NoContent(); // Respuesta HTTP 204 indicando que se eliminó con éxito
        }

        [HttpGet]
        public async Task<IActionResult> LeerTodo(int cantidad = 10, int pagina = 0, string textoBusqueda = null)
        {
            try
            {
                
                var query = _appDbContext.Personas.AsQueryable();

                // Si hay texto de búsqueda, aplica un filtro
                if (!string.IsNullOrWhiteSpace(textoBusqueda))
                {
                    query = query.Where(p =>
                        p.Name.Contains(textoBusqueda) ||
                        p.LastName.Contains(textoBusqueda));
                }

                // Paginación: Calcula el "skip" y "take"
                var totalRegistros = await query.CountAsync();
                var personas = await query
                    .Skip(cantidad * pagina)
                    .Take(cantidad)
                    .ToListAsync();

                // Retorna los datos junto con información de paginación
                return Ok(new
                {
                    TotalRegistros = totalRegistros,
                    PaginaActual = pagina,
                    CantidadPorPagina = cantidad,
                    Datos = personas
                });
            }
            catch (Exception e)
            {
                // Manejo básico de errores: devolver 500 Internal Server Error
                return StatusCode(StatusCodes.Status500InternalServerError, new
                {
                    Mensaje = "Ocurrió un error al procesar la solicitud.",
                    Detalles = e.Message
                });
            }
        }


    }
}
