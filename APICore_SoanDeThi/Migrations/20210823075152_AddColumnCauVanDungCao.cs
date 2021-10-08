using Microsoft.EntityFrameworkCore.Migrations;

namespace APICore_SoanDeThi.Migrations
{
    public partial class AddColumnCauVanDungCao : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "CauTrungBinh",
                table: "BaiKiemTra_Group",
                newName: "CauVanDungThap");

            migrationBuilder.RenameColumn(
                name: "CauKho",
                table: "BaiKiemTra_Group",
                newName: "CauVanDungCao");

            migrationBuilder.RenameColumn(
                name: "CauDe",
                table: "BaiKiemTra_Group",
                newName: "CauHieu");

            migrationBuilder.AddColumn<int>(
                name: "CauBiet",
                table: "BaiKiemTra_Group",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CauBiet",
                table: "BaiKiemTra_Group");

            migrationBuilder.RenameColumn(
                name: "CauVanDungThap",
                table: "BaiKiemTra_Group",
                newName: "CauTrungBinh");

            migrationBuilder.RenameColumn(
                name: "CauVanDungCao",
                table: "BaiKiemTra_Group",
                newName: "CauKho");

            migrationBuilder.RenameColumn(
                name: "CauHieu",
                table: "BaiKiemTra_Group",
                newName: "CauDe");
        }
    }
}
