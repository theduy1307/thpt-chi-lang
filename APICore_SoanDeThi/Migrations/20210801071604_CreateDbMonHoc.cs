using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace APICore_SoanDeThi.Migrations
{
    public partial class CreateDbMonHoc : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "BaiHoc",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    IdChuong = table.Column<long>(type: "bigint", nullable: false),
                    SoThuTu = table.Column<int>(type: "integer", nullable: false),
                    MaBaiHoc = table.Column<string>(type: "text", nullable: true),
                    TenBaiHoc = table.Column<string>(type: "text", nullable: true),
                    NguoiTao = table.Column<long>(type: "bigint", nullable: false),
                    NgayTao = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    NguoiSua = table.Column<long>(type: "bigint", nullable: false),
                    NgaySua = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    IsDisabled = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BaiHoc", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "BaiKiemTra",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    IdGroup = table.Column<long>(type: "bigint", nullable: false),
                    MaDe = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BaiKiemTra", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "BaiKiemTra_ChiTiet",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    IdBaiKiemTra = table.Column<long>(type: "bigint", nullable: false),
                    IdCauHoi = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BaiKiemTra_ChiTiet", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "BaiKiemTra_Group",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    TenBaiKiemTra = table.Column<string>(type: "text", nullable: true),
                    SoLuongDe = table.Column<int>(type: "integer", nullable: false),
                    CauDe = table.Column<int>(type: "integer", nullable: false),
                    CauTrungBinh = table.Column<int>(type: "integer", nullable: false),
                    CauKho = table.Column<int>(type: "integer", nullable: false),
                    Lop = table.Column<byte>(type: "smallint", nullable: false),
                    NguoiTao = table.Column<long>(type: "bigint", nullable: false),
                    NgayTao = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    NguoiSua = table.Column<long>(type: "bigint", nullable: false),
                    NgaySua = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    TrangThai = table.Column<short>(type: "smallint", nullable: false),
                    IsDisabled = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BaiKiemTra_Group", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ChuongMonHoc",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    IdMonHoc = table.Column<long>(type: "bigint", nullable: false),
                    SoThuTu = table.Column<int>(type: "integer", nullable: false),
                    MaChuong = table.Column<string>(type: "text", nullable: true),
                    TenChuong = table.Column<string>(type: "text", nullable: true),
                    Lop = table.Column<byte>(type: "smallint", nullable: false),
                    NguoiTao = table.Column<long>(type: "bigint", nullable: false),
                    NgayTao = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    NguoiSua = table.Column<long>(type: "bigint", nullable: false),
                    NgaySua = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    IsDisabled = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ChuongMonHoc", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "MonHoc",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    MaMonHoc = table.Column<string>(type: "text", nullable: true),
                    TenMonHoc = table.Column<string>(type: "text", nullable: true),
                    NguoiTao = table.Column<long>(type: "bigint", nullable: false),
                    NgayTao = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    NguoiSua = table.Column<long>(type: "bigint", nullable: false),
                    NgaySua = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    IsDisabled = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MonHoc", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BaiHoc");

            migrationBuilder.DropTable(
                name: "BaiKiemTra");

            migrationBuilder.DropTable(
                name: "BaiKiemTra_ChiTiet");

            migrationBuilder.DropTable(
                name: "BaiKiemTra_Group");

            migrationBuilder.DropTable(
                name: "ChuongMonHoc");

            migrationBuilder.DropTable(
                name: "MonHoc");
        }
    }
}
