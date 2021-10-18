using Microsoft.EntityFrameworkCore.Migrations;

namespace APICore_SoanDeThi.Migrations
{
    public partial class ChangeNameTables : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PqPermission_PqPermissionGroup_CodeGroupNavigationId",
                table: "PqPermission");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PqSubMenu",
                table: "PqSubMenu");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PqPermissionGroup",
                table: "PqPermissionGroup");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PqPermission",
                table: "PqPermission");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PqMainMenu",
                table: "PqMainMenu");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PqGroupPermit",
                table: "PqGroupPermit");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PqGroupAccount",
                table: "PqGroupAccount");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PqGroup",
                table: "PqGroup");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PqAccountPermit",
                table: "PqAccountPermit");

            migrationBuilder.RenameTable(
                name: "PqSubMenu",
                newName: "PQ_SubMenu");

            migrationBuilder.RenameTable(
                name: "PqPermissionGroup",
                newName: "PQ_Permission_Group");

            migrationBuilder.RenameTable(
                name: "PqPermission",
                newName: "PQ_Permission");

            migrationBuilder.RenameTable(
                name: "PqMainMenu",
                newName: "PQ_MainMenu");

            migrationBuilder.RenameTable(
                name: "PqGroupPermit",
                newName: "PQ_Group_Permit");

            migrationBuilder.RenameTable(
                name: "PqGroupAccount",
                newName: "PQ_Group_Account");

            migrationBuilder.RenameTable(
                name: "PqGroup",
                newName: "PQ_Group");

            migrationBuilder.RenameTable(
                name: "PqAccountPermit",
                newName: "PQ_Account_Permit");

            migrationBuilder.RenameIndex(
                name: "IX_PqPermission_CodeGroupNavigationId",
                table: "PQ_Permission",
                newName: "IX_PQ_Permission_CodeGroupNavigationId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PQ_SubMenu",
                table: "PQ_SubMenu",
                column: "IdSubMenu");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PQ_Permission_Group",
                table: "PQ_Permission_Group",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PQ_Permission",
                table: "PQ_Permission",
                column: "IdPermit");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PQ_MainMenu",
                table: "PQ_MainMenu",
                column: "IdMain");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PQ_Group_Permit",
                table: "PQ_Group_Permit",
                column: "IdPermit");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PQ_Group_Account",
                table: "PQ_Group_Account",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PQ_Group",
                table: "PQ_Group",
                column: "IdGroup");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PQ_Account_Permit",
                table: "PQ_Account_Permit",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_PQ_Permission_PQ_Permission_Group_CodeGroupNavigationId",
                table: "PQ_Permission",
                column: "CodeGroupNavigationId",
                principalTable: "PQ_Permission_Group",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PQ_Permission_PQ_Permission_Group_CodeGroupNavigationId",
                table: "PQ_Permission");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PQ_SubMenu",
                table: "PQ_SubMenu");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PQ_Permission_Group",
                table: "PQ_Permission_Group");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PQ_Permission",
                table: "PQ_Permission");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PQ_MainMenu",
                table: "PQ_MainMenu");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PQ_Group_Permit",
                table: "PQ_Group_Permit");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PQ_Group_Account",
                table: "PQ_Group_Account");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PQ_Group",
                table: "PQ_Group");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PQ_Account_Permit",
                table: "PQ_Account_Permit");

            migrationBuilder.RenameTable(
                name: "PQ_SubMenu",
                newName: "PqSubMenu");

            migrationBuilder.RenameTable(
                name: "PQ_Permission_Group",
                newName: "PqPermissionGroup");

            migrationBuilder.RenameTable(
                name: "PQ_Permission",
                newName: "PqPermission");

            migrationBuilder.RenameTable(
                name: "PQ_MainMenu",
                newName: "PqMainMenu");

            migrationBuilder.RenameTable(
                name: "PQ_Group_Permit",
                newName: "PqGroupPermit");

            migrationBuilder.RenameTable(
                name: "PQ_Group_Account",
                newName: "PqGroupAccount");

            migrationBuilder.RenameTable(
                name: "PQ_Group",
                newName: "PqGroup");

            migrationBuilder.RenameTable(
                name: "PQ_Account_Permit",
                newName: "PqAccountPermit");

            migrationBuilder.RenameIndex(
                name: "IX_PQ_Permission_CodeGroupNavigationId",
                table: "PqPermission",
                newName: "IX_PqPermission_CodeGroupNavigationId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PqSubMenu",
                table: "PqSubMenu",
                column: "IdSubMenu");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PqPermissionGroup",
                table: "PqPermissionGroup",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PqPermission",
                table: "PqPermission",
                column: "IdPermit");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PqMainMenu",
                table: "PqMainMenu",
                column: "IdMain");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PqGroupPermit",
                table: "PqGroupPermit",
                column: "IdPermit");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PqGroupAccount",
                table: "PqGroupAccount",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PqGroup",
                table: "PqGroup",
                column: "IdGroup");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PqAccountPermit",
                table: "PqAccountPermit",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_PqPermission_PqPermissionGroup_CodeGroupNavigationId",
                table: "PqPermission",
                column: "CodeGroupNavigationId",
                principalTable: "PqPermissionGroup",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
