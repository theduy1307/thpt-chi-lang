using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace APICore_SoanDeThi.Migrations
{
    public partial class CreateDatabase : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "PqMainMenu",
                columns: table => new
                {
                    IdMain = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Title = table.Column<string>(type: "text", nullable: true),
                    Summary = table.Column<string>(type: "text", nullable: true),
                    IdModule = table.Column<long>(type: "bigint", nullable: true),
                    Link = table.Column<string>(type: "text", nullable: true),
                    Position = table.Column<short>(type: "smallint", nullable: true),
                    Icon = table.Column<string>(type: "text", nullable: true),
                    GroupName = table.Column<string>(type: "text", nullable: true),
                    Target = table.Column<string>(type: "text", nullable: true),
                    AllowCode = table.Column<string>(type: "text", nullable: true),
                    AllowPermit = table.Column<long>(type: "bigint", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PqMainMenu", x => x.IdMain);
                });

            migrationBuilder.CreateTable(
                name: "PqModule",
                columns: table => new
                {
                    IdModule = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Title = table.Column<string>(type: "text", nullable: true),
                    Link = table.Column<string>(type: "text", nullable: true),
                    Position = table.Column<short>(type: "smallint", nullable: true),
                    Icon = table.Column<string>(type: "text", nullable: true),
                    Target = table.Column<string>(type: "text", nullable: true),
                    Summary = table.Column<string>(type: "text", nullable: true),
                    AllowCode = table.Column<string>(type: "text", nullable: true),
                    AllowPermit = table.Column<long>(type: "bigint", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PqModule", x => x.IdModule);
                });

            migrationBuilder.CreateTable(
                name: "PqSubMenu",
                columns: table => new
                {
                    IdSubMenu = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Title = table.Column<string>(type: "text", nullable: true),
                    Summary = table.Column<string>(type: "text", nullable: true),
                    Link = table.Column<string>(type: "text", nullable: true),
                    PageKey = table.Column<string>(type: "text", nullable: true),
                    Target = table.Column<string>(type: "text", nullable: true),
                    Position = table.Column<short>(type: "smallint", nullable: true),
                    Icon = table.Column<string>(type: "text", nullable: true),
                    IdMainMenu = table.Column<long>(type: "bigint", nullable: true),
                    GroupName = table.Column<string>(type: "text", nullable: true),
                    AllowCode = table.Column<string>(type: "text", nullable: true),
                    AllowPermit = table.Column<long>(type: "bigint", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PqSubMenu", x => x.IdSubMenu);
                });

            migrationBuilder.CreateTable(
                name: "SysAttachment",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    NguoiTao = table.Column<long>(type: "bigint", nullable: false),
                    NgayTao = table.Column<DateTime>(type: "timestamp without time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SysAttachment", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "SysAttachmentDetail",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    AttachmentId = table.Column<long>(type: "bigint", nullable: false),
                    TenFile = table.Column<string>(type: "text", nullable: true),
                    LoaiFile = table.Column<string>(type: "text", nullable: true),
                    Type = table.Column<string>(type: "text", nullable: true),
                    NguoiTao = table.Column<long>(type: "bigint", nullable: false),
                    NgayTao = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    NguoiSua = table.Column<long>(type: "bigint", nullable: true),
                    NgaySua = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    IsDisable = table.Column<bool>(type: "boolean", nullable: false),
                    TenFileGoc = table.Column<string>(type: "text", nullable: true),
                    GhiChu = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SysAttachmentDetail", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ViewAccount",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Username = table.Column<string>(type: "text", nullable: true),
                    IdNv = table.Column<long>(type: "bigint", nullable: true),
                    Password = table.Column<string>(type: "text", nullable: true),
                    Lock = table.Column<short>(type: "smallint", nullable: true),
                    Disable = table.Column<short>(type: "smallint", nullable: true),
                    Lastlogin = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    DPassword = table.Column<string>(type: "text", nullable: true),
                    Createddate = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    Lastpasschg = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    Email = table.Column<string>(type: "text", nullable: true),
                    Lastsend = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    Token = table.Column<string>(type: "text", nullable: true),
                    Faillogin = table.Column<int>(type: "integer", nullable: true),
                    Solop = table.Column<int>(type: "integer", nullable: true),
                    Validatecode = table.Column<string>(type: "text", nullable: true),
                    Expirevalidate = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    Loaitaikhoan = table.Column<short>(type: "smallint", nullable: true),
                    Exppassword = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    Authentype = table.Column<int>(type: "integer", nullable: true),
                    Iscreateldapaccount = table.Column<short>(type: "smallint", nullable: true),
                    Isadmin = table.Column<short>(type: "smallint", nullable: true),
                    Defaultmodule = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ViewAccount", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ViewChucDanh",
                columns: table => new
                {
                    IdRow = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Tenchucdanh = table.Column<string>(type: "text", nullable: true),
                    IdCv = table.Column<long>(type: "bigint", nullable: true),
                    IdBp = table.Column<long>(type: "bigint", nullable: true),
                    IdParent = table.Column<long>(type: "bigint", nullable: true),
                    Vitri = table.Column<int>(type: "integer", nullable: true),
                    Sonhanviencan = table.Column<int>(type: "integer", nullable: true),
                    Disable = table.Column<short>(type: "smallint", nullable: true),
                    Macd = table.Column<string>(type: "text", nullable: true),
                    Yeucaubangcap = table.Column<string>(type: "text", nullable: true),
                    Yeucaukynanglamviec = table.Column<string>(type: "text", nullable: true),
                    Yeucaukynangkhac = table.Column<string>(type: "text", nullable: true),
                    Motacongviec = table.Column<string>(type: "text", nullable: true),
                    Ghichu = table.Column<string>(type: "text", nullable: true),
                    Nhom = table.Column<long>(type: "bigint", nullable: true),
                    Tentienganh = table.Column<string>(type: "text", nullable: true),
                    Lastmodified = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    Nguoisua = table.Column<long>(type: "bigint", nullable: true),
                    Isleading = table.Column<short>(type: "smallint", nullable: true),
                    Isstop = table.Column<short>(type: "smallint", nullable: true),
                    Visiblecap = table.Column<short>(type: "smallint", nullable: true),
                    Visiblebophan = table.Column<short>(type: "smallint", nullable: true),
                    IdCapquanly = table.Column<long>(type: "bigint", nullable: true),
                    Cocauid = table.Column<long>(type: "bigint", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ViewChucDanh", x => x.IdRow);
                });

            migrationBuilder.CreateTable(
                name: "ViewCoCauToChuc",
                columns: table => new
                {
                    Rowid = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Capcocau = table.Column<int>(type: "integer", nullable: true),
                    Title = table.Column<string>(type: "text", nullable: true),
                    Parentid = table.Column<long>(type: "bigint", nullable: true),
                    Createddate = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    Createdby = table.Column<long>(type: "bigint", nullable: true),
                    Lastmodified = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    Modifiedby = table.Column<long>(type: "bigint", nullable: true),
                    Deleteddate = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    Deletedby = table.Column<long>(type: "bigint", nullable: true),
                    Custemerid = table.Column<long>(type: "bigint", nullable: true),
                    Vitri = table.Column<int>(type: "integer", nullable: true),
                    Code = table.Column<string>(type: "text", nullable: true),
                    Loaidonvi = table.Column<int>(type: "integer", nullable: true),
                    Chedolamviec = table.Column<int>(type: "integer", nullable: true),
                    Disable = table.Column<short>(type: "smallint", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ViewCoCauToChuc", x => x.Rowid);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PqMainMenu");

            migrationBuilder.DropTable(
                name: "PqModule");

            migrationBuilder.DropTable(
                name: "PqSubMenu");

            migrationBuilder.DropTable(
                name: "SysAttachment");

            migrationBuilder.DropTable(
                name: "SysAttachmentDetail");

            migrationBuilder.DropTable(
                name: "ViewAccount");

            migrationBuilder.DropTable(
                name: "ViewChucDanh");

            migrationBuilder.DropTable(
                name: "ViewCoCauToChuc");
        }
    }
}
