using Microsoft.EntityFrameworkCore.Migrations;

namespace APICore_SoanDeThi.Migrations
{
    public partial class AddIdMonHoc_BaiKiemTraGroup : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "IdMonHoc",
                table: "BaiKiemTra_Group",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<string>(
                name: "NamHoc",
                table: "BaiKiemTra_Group",
                type: "text",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IdMonHoc",
                table: "BaiKiemTra_Group");

            migrationBuilder.DropColumn(
                name: "NamHoc",
                table: "BaiKiemTra_Group");
        }
    }
}
