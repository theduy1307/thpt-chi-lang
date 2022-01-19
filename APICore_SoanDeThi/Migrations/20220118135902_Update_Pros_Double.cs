using Microsoft.EntityFrameworkCore.Migrations;

namespace APICore_SoanDeThi.Migrations
{
    public partial class Update_Pros_Double : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<float>(
                name: "ThoiGianLamBaiConLai",
                table: "BaiKiemTra_TrucTuyen_HocSinh",
                type: "real",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "ThoiGianLamBaiConLai",
                table: "BaiKiemTra_TrucTuyen_HocSinh",
                type: "integer",
                nullable: false,
                oldClrType: typeof(float),
                oldType: "real");
        }
    }
}
