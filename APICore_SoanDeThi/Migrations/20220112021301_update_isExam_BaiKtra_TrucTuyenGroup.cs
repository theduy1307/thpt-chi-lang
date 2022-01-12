using Microsoft.EntityFrameworkCore.Migrations;

namespace APICore_SoanDeThi.Migrations
{
    public partial class update_isExam_BaiKtra_TrucTuyenGroup : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
           

            migrationBuilder.AddColumn<bool>(
                name: "isExam",
                table: "BaiKiemTra_TrucTuyen_Group",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "isExam",
                table: "BaiKiemTra_TrucTuyen_Group");

           
        }
    }
}
