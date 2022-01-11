using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace APICore_SoanDeThi.Migrations
{
    public partial class ThemBang_BaiKiemTraTrucTuyen_Group_1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "BaiKiemTra_TrucTuyen_Group",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    TenBaiKiemTra = table.Column<string>(type: "text", nullable: true),
                    SoLuongDe = table.Column<int>(type: "integer", nullable: false),
                    CauBiet = table.Column<int>(type: "integer", nullable: false),
                    CauHieu = table.Column<int>(type: "integer", nullable: false),
                    CauVanDungThap = table.Column<int>(type: "integer", nullable: false),
                    CauVanDungCao = table.Column<int>(type: "integer", nullable: false),
                    ThoiGianLamBai = table.Column<int>(type: "integer", nullable: false),
                    NamHoc = table.Column<string>(type: "text", nullable: true),
                    IdMonHoc = table.Column<long>(type: "bigint", nullable: false),
                    HocKy = table.Column<int>(type: "integer", nullable: false),
                    Lop = table.Column<byte>(type: "smallint", nullable: false),
                    NguoiTao = table.Column<long>(type: "bigint", nullable: false),
                    NgayTao = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    NguoiSua = table.Column<long>(type: "bigint", nullable: true),
                    NgaySua = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    TrangThai = table.Column<short>(type: "smallint", nullable: false),
                    IsDisabled = table.Column<bool>(type: "boolean", nullable: false),
                    IsCustom = table.Column<bool>(type: "boolean", nullable: false),
                    NgayThi = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    GioThi = table.Column<string>(type: "text", nullable: true),
                    Password = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BaiKiemTra_TrucTuyen_Group", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BaiKiemTra_TrucTuyen_Group");
        }
    }
}
