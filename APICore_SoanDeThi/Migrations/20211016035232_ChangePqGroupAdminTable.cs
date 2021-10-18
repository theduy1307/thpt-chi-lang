using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace APICore_SoanDeThi.Migrations
{
    public partial class ChangePqGroupAdminTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PQ_Permission_PQ_Permission_Group_CodeGroupNavigationId",
                table: "PQ_Permission");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PQ_Permission_Group",
                table: "PQ_Permission_Group");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PQ_Permission",
                table: "PQ_Permission");

            migrationBuilder.DropIndex(
                name: "IX_PQ_Permission_CodeGroupNavigationId",
                table: "PQ_Permission");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PQ_Group_Permit",
                table: "PQ_Group_Permit");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PQ_Group_Account",
                table: "PQ_Group_Account");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PQ_Account_Permit",
                table: "PQ_Account_Permit");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "PQ_Permission_Group");

            migrationBuilder.DropColumn(
                name: "IdPermit",
                table: "PQ_Permission");

            migrationBuilder.DropColumn(
                name: "CodeGroupNavigationId",
                table: "PQ_Permission");

            migrationBuilder.DropColumn(
                name: "IdPermit",
                table: "PQ_Group_Permit");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "PQ_Group_Account");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "PQ_Account_Permit");

            migrationBuilder.DropColumn(
                name: "IdPermit",
                table: "PQ_Account_Permit");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "PQ_Permission_Group",
                type: "character varying(100)",
                maxLength: 100,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "IdParent",
                table: "PQ_Permission_Group",
                type: "character varying(20)",
                maxLength: 20,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Code",
                table: "PQ_Permission_Group",
                type: "character varying(20)",
                maxLength: 20,
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "PQ_Permission",
                type: "character varying(100)",
                maxLength: 100,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "PQ_Permission",
                type: "character varying(200)",
                maxLength: 200,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CodeGroup",
                table: "PQ_Permission",
                type: "character varying(20)",
                maxLength: 20,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Code",
                table: "PQ_Permission",
                type: "character varying(20)",
                maxLength: 20,
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Code",
                table: "PQ_Group_Permit",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "UserName",
                table: "PQ_Group_Account",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "UserName",
                table: "PQ_Account_Permit",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Code",
                table: "PQ_Account_Permit",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_PQ_Permission_Group",
                table: "PQ_Permission_Group",
                column: "Code");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PQ_Permission",
                table: "PQ_Permission",
                column: "Code");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PQ_Group_Permit",
                table: "PQ_Group_Permit",
                columns: new[] { "IdGroup", "Code" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_PQ_Group_Account",
                table: "PQ_Group_Account",
                columns: new[] { "IdGroup", "UserName" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_PQ_Account_Permit",
                table: "PQ_Account_Permit",
                columns: new[] { "UserName", "Code" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_PQ_Permission_Group",
                table: "PQ_Permission_Group");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PQ_Permission",
                table: "PQ_Permission");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PQ_Group_Permit",
                table: "PQ_Group_Permit");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PQ_Group_Account",
                table: "PQ_Group_Account");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PQ_Account_Permit",
                table: "PQ_Account_Permit");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "PQ_Permission_Group",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "character varying(100)",
                oldMaxLength: 100,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "IdParent",
                table: "PQ_Permission_Group",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "character varying(20)",
                oldMaxLength: 20,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Code",
                table: "PQ_Permission_Group",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "character varying(20)",
                oldMaxLength: 20);

            migrationBuilder.AddColumn<long>(
                name: "Id",
                table: "PQ_Permission_Group",
                type: "bigint",
                nullable: false,
                defaultValue: 0L)
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "PQ_Permission",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "character varying(100)",
                oldMaxLength: 100,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "PQ_Permission",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "character varying(200)",
                oldMaxLength: 200,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CodeGroup",
                table: "PQ_Permission",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "character varying(20)",
                oldMaxLength: 20,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Code",
                table: "PQ_Permission",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "character varying(20)",
                oldMaxLength: 20);

            migrationBuilder.AddColumn<long>(
                name: "IdPermit",
                table: "PQ_Permission",
                type: "bigint",
                nullable: false,
                defaultValue: 0L)
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AddColumn<long>(
                name: "CodeGroupNavigationId",
                table: "PQ_Permission",
                type: "bigint",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Code",
                table: "PQ_Group_Permit",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AddColumn<long>(
                name: "IdPermit",
                table: "PQ_Group_Permit",
                type: "bigint",
                nullable: false,
                defaultValue: 0L)
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AlterColumn<string>(
                name: "UserName",
                table: "PQ_Group_Account",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AddColumn<long>(
                name: "Id",
                table: "PQ_Group_Account",
                type: "bigint",
                nullable: false,
                defaultValue: 0L)
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AlterColumn<string>(
                name: "Code",
                table: "PQ_Account_Permit",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<string>(
                name: "UserName",
                table: "PQ_Account_Permit",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AddColumn<long>(
                name: "Id",
                table: "PQ_Account_Permit",
                type: "bigint",
                nullable: false,
                defaultValue: 0L)
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AddColumn<long>(
                name: "IdPermit",
                table: "PQ_Account_Permit",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddPrimaryKey(
                name: "PK_PQ_Permission_Group",
                table: "PQ_Permission_Group",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PQ_Permission",
                table: "PQ_Permission",
                column: "IdPermit");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PQ_Group_Permit",
                table: "PQ_Group_Permit",
                column: "IdPermit");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PQ_Group_Account",
                table: "PQ_Group_Account",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PQ_Account_Permit",
                table: "PQ_Account_Permit",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_PQ_Permission_CodeGroupNavigationId",
                table: "PQ_Permission",
                column: "CodeGroupNavigationId");

            migrationBuilder.AddForeignKey(
                name: "FK_PQ_Permission_PQ_Permission_Group_CodeGroupNavigationId",
                table: "PQ_Permission",
                column: "CodeGroupNavigationId",
                principalTable: "PQ_Permission_Group",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
