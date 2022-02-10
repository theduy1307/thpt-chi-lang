using Microsoft.EntityFrameworkCore.Migrations;

namespace APICore_SoanDeThi.Migrations
{
    public partial class FixNgu : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "IsRead",
                table: "SysNotifyDetail",
                newName: "IsSeen");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "IsSeen",
                table: "SysNotifyDetail",
                newName: "IsRead");
        }
    }
}
