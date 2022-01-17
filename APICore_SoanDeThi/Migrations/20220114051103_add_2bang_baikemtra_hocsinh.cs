using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace APICore_SoanDeThi.Migrations
{
    public partial class add_2bang_baikemtra_hocsinh : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "BaiKiemTra_TrucTuyen_HocSinh",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    IdHocSinh = table.Column<long>(type: "bigint", nullable: false),
                    IdBaiKiemTraOnline = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BaiKiemTra_TrucTuyen_HocSinh", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "BaiKiemTra_TrucTuyen_HocSinh_ChiTiet",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    IdBaiKiemTraHocSinh = table.Column<long>(type: "bigint", nullable: false),
                    IdQueston = table.Column<long>(type: "bigint", nullable: false),
                    choosen = table.Column<long>(type: "bigint", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BaiKiemTra_TrucTuyen_HocSinh_ChiTiet", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BaiKiemTra_TrucTuyen_HocSinh");

            migrationBuilder.DropTable(
                name: "BaiKiemTra_TrucTuyen_HocSinh_ChiTiet");
        }
    }
}
