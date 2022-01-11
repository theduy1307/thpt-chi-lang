using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace APICore_SoanDeThi.Migrations
{
    public partial class Update_2BangClone : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "BaiKiemTra_TrucTuyen",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    IdGroup = table.Column<long>(type: "bigint", nullable: false),
                    MaDe = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BaiKiemTra_TrucTuyen", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "BaiKiemTra_TrucTuyen_ChiTiet",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    IdBaiKiemTra = table.Column<long>(type: "bigint", nullable: false),
                    IdCauHoi = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BaiKiemTra_TrucTuyen_ChiTiet", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BaiKiemTra_TrucTuyen");

            migrationBuilder.DropTable(
                name: "BaiKiemTra_TrucTuyen_ChiTiet");
        }
    }
}
