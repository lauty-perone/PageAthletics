using Microsoft.EntityFrameworkCore;
using PaginaAtletismo_Backend.Models;
namespace PaginaAtletismo_Backend.Data
{
    public class AppDbContext : DbContext //Esta clase sera como puente entre la DB y entity framework
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) 
        { 
            
        }

        public DbSet<Persona> Personas{ get; set; }

        public DbSet<Torneo> Torneos{ get; set; }


        //Crea las tablas de la Base de Datos
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Persona>(tb =>
            {
                tb.HasKey(col => col.IdPersona);

                tb.Property(col => col.IdPersona)
                    .UseIdentityColumn()
                    .ValueGeneratedOnAdd();

                tb.Property(col=> col.Name).HasMaxLength(50);
                tb.Property(col => col.Email).HasMaxLength(50);

            });

            modelBuilder.Entity<Persona>().ToTable("Persona");

            // Definición de la tabla Torneo
            modelBuilder.Entity<Torneo>(tb =>
            {
                tb.HasKey(t => t.IdTorneo);

                tb.Property(t => t.Name).HasMaxLength(100).IsRequired();
                tb.Property(t => t.Lugar).HasMaxLength(100);
                tb.Property(t => t.ResultadosUrl).HasMaxLength(255);

                tb.Property(t => t.FechaTorneo).IsRequired();
                tb.Property(t => t.CantidadCarriles).HasDefaultValue(8);
            });

            modelBuilder.Entity<Torneo>().ToTable("Torneo");
        }


    }
}
