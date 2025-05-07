using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PaginaAtletismo_Backend.Data;
using PaginaAtletismo_Backend.Models;

namespace PaginaAtletismo_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TorneoController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TorneoController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/torneo
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Torneo>>> GetTorneos()
        {
            return await _context.Torneos.ToListAsync();
        }

        // GET: api/torneo/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Torneo>> GetTorneo(int id)
        {
            var torneo = await _context.Torneos.FindAsync(id);

            if (torneo == null)
            {
                return NotFound(new { mensaje = "Torneo no encontrado" });
            }

            return torneo;
        }

        // POST: api/torneo
        [HttpPost]
        public async Task<ActionResult<Torneo>> CreateTorneo(Torneo torneo)
        {
            _context.Torneos.Add(torneo);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTorneo), new { id = torneo.IdTorneo }, torneo);
        }

        // PUT: api/torneo/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTorneo(int id, Torneo torneo)
        {
            if (id != torneo.IdTorneo)
            {
                return BadRequest(new { mensaje = "El ID del torneo no coincide" });
            }

            _context.Entry(torneo).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Torneos.Any(t => t.IdTorneo == id))
                {
                    return NotFound(new { mensaje = "Torneo no encontrado para actualizar" });
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/torneo/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTorneo(int id)
        {
            var torneo = await _context.Torneos.FindAsync(id);
            if (torneo == null)
            {
                return NotFound(new { mensaje = "Torneo no encontrado para eliminar" });
            }

            _context.Torneos.Remove(torneo);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
