using Microsoft.EntityFrameworkCore.Migrations;

namespace APICore_SoanDeThi.Migrations
{
    public partial class CreateColum : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "HocKy",
                table: "BaiKiemTra_Group",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "ThoiGianLamBai",
                table: "BaiKiemTra_Group",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "HocKy",
                table: "BaiHoc",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "HocKy",
                table: "BaiKiemTra_Group");

            migrationBuilder.DropColumn(
                name: "ThoiGianLamBai",
                table: "BaiKiemTra_Group");

            migrationBuilder.DropColumn(
                name: "HocKy",
                table: "BaiHoc");
        }
    }
}
