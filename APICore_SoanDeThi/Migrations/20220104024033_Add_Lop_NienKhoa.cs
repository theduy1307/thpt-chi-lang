using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace APICore_SoanDeThi.Migrations
{
    public partial class Add_Lop_NienKhoa : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Lop",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    TenLop = table.Column<string>(type: "text", nullable: true),
                    Loai = table.Column<string>(type: "text", nullable: true),
                    IdNienKhoa = table.Column<long>(type: "bigint", nullable: false),
                    IdChuNhiem = table.Column<long>(type: "bigint", nullable: false),
                    NguoiTao = table.Column<long>(type: "bigint", nullable: false),
                    NgayTao = table.Column<string>(type: "text", nullable: true),
                    NguoiSua = table.Column<long>(type: "bigint", nullable: false),
                    NgaySua = table.Column<string>(type: "text", nullable: true),
                    Disabled = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Lop", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "NienKhoa",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    TenNienKhoa = table.Column<string>(type: "text", nullable: true),
                    NguoiTao = table.Column<long>(type: "bigint", nullable: false),
                    NgayTao = table.Column<string>(type: "text", nullable: true),
                    NguoiSua = table.Column<long>(type: "bigint", nullable: false),
                    NgaySua = table.Column<string>(type: "text", nullable: true),
                    Disabled = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NienKhoa", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Lop");

            migrationBuilder.DropTable(
                name: "NienKhoa");
        }
    }
}
