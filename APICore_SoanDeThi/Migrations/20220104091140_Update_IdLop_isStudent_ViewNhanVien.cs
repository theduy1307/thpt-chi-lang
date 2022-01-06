using Microsoft.EntityFrameworkCore.Migrations;

namespace APICore_SoanDeThi.Migrations
{
    public partial class Update_IdLop_isStudent_ViewNhanVien : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Lop",
                table: "ViewNhanVien",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "isStudent",
                table: "ViewNhanVien",
                type: "boolean",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Lop",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "isStudent",
                table: "ViewNhanVien");
        }
    }
}
