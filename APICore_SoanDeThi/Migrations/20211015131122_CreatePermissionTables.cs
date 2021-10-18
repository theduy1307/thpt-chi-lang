using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace APICore_SoanDeThi.Migrations
{
    public partial class CreatePermissionTables : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_PqModule",
                table: "PqModule");

            migrationBuilder.RenameTable(
                name: "PqModule",
                newName: "PQ_Module");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PQ_Module",
                table: "PQ_Module",
                column: "IdModule");

            migrationBuilder.CreateTable(
                name: "PqAccountPermit",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserName = table.Column<string>(type: "text", nullable: true),
                    IdPermit = table.Column<long>(type: "bigint", nullable: false),
                    Code = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PqAccountPermit", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PqGroup",
                columns: table => new
                {
                    IdGroup = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: true),
                    Description = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PqGroup", x => x.IdGroup);
                });

            migrationBuilder.CreateTable(
                name: "PqGroupAccount",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    IdGroup = table.Column<long>(type: "bigint", nullable: false),
                    UserName = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PqGroupAccount", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PqGroupPermit",
                columns: table => new
                {
                    IdPermit = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    IdGroup = table.Column<long>(type: "bigint", nullable: false),
                    Code = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PqGroupPermit", x => x.IdPermit);
                });

            migrationBuilder.CreateTable(
                name: "PqPermissionGroup",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: true),
                    Position = table.Column<short>(type: "smallint", nullable: true),
                    Description = table.Column<string>(type: "text", nullable: true),
                    Code = table.Column<string>(type: "text", nullable: true),
                    IdParent = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PqPermissionGroup", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "SysConfigDashboard",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: true),
                    Component = table.Column<string>(type: "text", nullable: true),
                    RouterLink = table.Column<string>(type: "text", nullable: true),
                    Code = table.Column<string>(type: "text", nullable: true),
                    Default = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SysConfigDashboard", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "SysRequestLogin",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    MaDinhDanh = table.Column<string>(type: "text", nullable: true),
                    ThongTinThietBi = table.Column<string>(type: "text", nullable: true),
                    NgayTao = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    NgayXacNhan = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    NguoiXacNhan = table.Column<long>(type: "bigint", nullable: true),
                    GhiChu = table.Column<string>(type: "text", nullable: true),
                    TinhTrang = table.Column<short>(type: "smallint", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SysRequestLogin", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PqPermission",
                columns: table => new
                {
                    IdPermit = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: true),
                    Description = table.Column<string>(type: "text", nullable: true),
                    IdGroup = table.Column<long>(type: "bigint", nullable: true),
                    Position = table.Column<short>(type: "smallint", nullable: true),
                    Code = table.Column<string>(type: "text", nullable: true),
                    CodeGroup = table.Column<string>(type: "text", nullable: true),
                    IsDisable = table.Column<bool>(type: "boolean", nullable: true),
                    CodeGroupNavigationId = table.Column<long>(type: "bigint", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PqPermission", x => x.IdPermit);
                    table.ForeignKey(
                        name: "FK_PqPermission_PqPermissionGroup_CodeGroupNavigationId",
                        column: x => x.CodeGroupNavigationId,
                        principalTable: "PqPermissionGroup",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PqPermission_CodeGroupNavigationId",
                table: "PqPermission",
                column: "CodeGroupNavigationId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PqAccountPermit");

            migrationBuilder.DropTable(
                name: "PqGroup");

            migrationBuilder.DropTable(
                name: "PqGroupAccount");

            migrationBuilder.DropTable(
                name: "PqGroupPermit");

            migrationBuilder.DropTable(
                name: "PqPermission");

            migrationBuilder.DropTable(
                name: "SysConfigDashboard");

            migrationBuilder.DropTable(
                name: "SysRequestLogin");

            migrationBuilder.DropTable(
                name: "PqPermissionGroup");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PQ_Module",
                table: "PQ_Module");

            migrationBuilder.RenameTable(
                name: "PQ_Module",
                newName: "PqModule");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PqModule",
                table: "PqModule",
                column: "IdModule");
        }
    }
}
