using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PaginaAtletismo_Backend.Migrations
{
    /// <inheritdoc />
    public partial class MigracionTorneo : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Torneo",
                columns: table => new
                {
                    IdTorneo = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    FechaTorneo = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Lugar = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    ResultadosUrl = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    FechaInicioInscripcion = table.Column<DateTime>(type: "datetime2", nullable: false),
                    FechaFinInscripcion = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CantidadCarriles = table.Column<int>(type: "int", nullable: false, defaultValue: 8),
                    Pruebas = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Torneo", x => x.IdTorneo);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Torneo");
        }
    }
}
