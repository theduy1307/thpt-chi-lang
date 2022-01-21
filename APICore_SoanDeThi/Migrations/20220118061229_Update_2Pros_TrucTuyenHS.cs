using Microsoft.EntityFrameworkCore.Migrations;

namespace APICore_SoanDeThi.Migrations
{
    public partial class Update_2Pros_TrucTuyenHS : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ThoiGianLamBaiConLai",
                table: "BaiKiemTra_TrucTuyen_HocSinh",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<long>(
                name: "TrangThai",
                table: "BaiKiemTra_TrucTuyen_HocSinh",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ThoiGianLamBaiConLai",
                table: "BaiKiemTra_TrucTuyen_HocSinh");

            migrationBuilder.DropColumn(
                name: "TrangThai",
                table: "BaiKiemTra_TrucTuyen_HocSinh");
        }
    }
}
