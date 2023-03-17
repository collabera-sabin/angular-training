using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LMS.Migrations
{
    /// <inheritdoc />
    public partial class anotherone3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Attendence_Users_StudentID",
                table: "Attendence");

            migrationBuilder.DropForeignKey(
                name: "FK_Attendence_Users_managerID",
                table: "Attendence");

            migrationBuilder.DropForeignKey(
                name: "FK_Attendence_Users_teacherID",
                table: "Attendence");

            migrationBuilder.AlterColumn<long>(
                name: "teacherID",
                table: "Attendence",
                type: "bigint",
                nullable: true,
                oldClrType: typeof(long),
                oldType: "bigint");

            migrationBuilder.AlterColumn<long>(
                name: "managerID",
                table: "Attendence",
                type: "bigint",
                nullable: true,
                oldClrType: typeof(long),
                oldType: "bigint");

            migrationBuilder.AlterColumn<long>(
                name: "StudentID",
                table: "Attendence",
                type: "bigint",
                nullable: true,
                oldClrType: typeof(long),
                oldType: "bigint");

            migrationBuilder.AddForeignKey(
                name: "FK_Attendence_Users_StudentID",
                table: "Attendence",
                column: "StudentID",
                principalTable: "Users",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Attendence_Users_managerID",
                table: "Attendence",
                column: "managerID",
                principalTable: "Users",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Attendence_Users_teacherID",
                table: "Attendence",
                column: "teacherID",
                principalTable: "Users",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Attendence_Users_StudentID",
                table: "Attendence");

            migrationBuilder.DropForeignKey(
                name: "FK_Attendence_Users_managerID",
                table: "Attendence");

            migrationBuilder.DropForeignKey(
                name: "FK_Attendence_Users_teacherID",
                table: "Attendence");

            migrationBuilder.AlterColumn<long>(
                name: "teacherID",
                table: "Attendence",
                type: "bigint",
                nullable: false,
                defaultValue: 0L,
                oldClrType: typeof(long),
                oldType: "bigint",
                oldNullable: true);

            migrationBuilder.AlterColumn<long>(
                name: "managerID",
                table: "Attendence",
                type: "bigint",
                nullable: false,
                defaultValue: 0L,
                oldClrType: typeof(long),
                oldType: "bigint",
                oldNullable: true);

            migrationBuilder.AlterColumn<long>(
                name: "StudentID",
                table: "Attendence",
                type: "bigint",
                nullable: false,
                defaultValue: 0L,
                oldClrType: typeof(long),
                oldType: "bigint",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Attendence_Users_StudentID",
                table: "Attendence",
                column: "StudentID",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Attendence_Users_managerID",
                table: "Attendence",
                column: "managerID",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Attendence_Users_teacherID",
                table: "Attendence",
                column: "teacherID",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
