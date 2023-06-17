using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MatchFixture.Migrations
{
    /// <inheritdoc />
    public partial class competition_type_add : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CompetitionType",
                table: "Tournaments",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CompetitionType",
                table: "Tournaments");
        }
    }
}
