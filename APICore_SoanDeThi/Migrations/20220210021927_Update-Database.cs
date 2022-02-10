using Microsoft.EntityFrameworkCore.Migrations;

namespace APICore_SoanDeThi.Migrations
{
    public partial class UpdateDatabase : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "IsSeen",
                table: "SysNotifyDetail",
                newName: "IsRead");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "IsRead",
                table: "SysNotifyDetail",
                newName: "IsSeen");
        }
    }
}
