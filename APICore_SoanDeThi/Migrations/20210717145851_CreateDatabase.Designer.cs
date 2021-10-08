﻿// <auto-generated />
using System;
using APICore_SoanDeThi.Models.DatabaseContext;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace APICore_SoanDeThi.Migrations
{
    [DbContext(typeof(SoanDeThi_DbContext))]
    [Migration("20210717145851_CreateDatabase")]
    partial class CreateDatabase
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 63)
                .HasAnnotation("ProductVersion", "2.2.6-servicing-10079")
                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            modelBuilder.Entity("APICore_SoanDeThi.Models.PqMainMenu", b =>
                {
                    b.Property<long>("IdMain")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<string>("AllowCode")
                        .HasColumnType("text");

                    b.Property<long?>("AllowPermit")
                        .HasColumnType("bigint");

                    b.Property<string>("GroupName")
                        .HasColumnType("text");

                    b.Property<string>("Icon")
                        .HasColumnType("text");

                    b.Property<long?>("IdModule")
                        .HasColumnType("bigint");

                    b.Property<string>("Link")
                        .HasColumnType("text");

                    b.Property<short?>("Position")
                        .HasColumnType("smallint");

                    b.Property<string>("Summary")
                        .HasColumnType("text");

                    b.Property<string>("Target")
                        .HasColumnType("text");

                    b.Property<string>("Title")
                        .HasColumnType("text");

                    b.HasKey("IdMain");

                    b.ToTable("PqMainMenu");
                });

            modelBuilder.Entity("APICore_SoanDeThi.Models.PqModule", b =>
                {
                    b.Property<long>("IdModule")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<string>("AllowCode")
                        .HasColumnType("text");

                    b.Property<long?>("AllowPermit")
                        .HasColumnType("bigint");

                    b.Property<string>("Icon")
                        .HasColumnType("text");

                    b.Property<string>("Link")
                        .HasColumnType("text");

                    b.Property<short?>("Position")
                        .HasColumnType("smallint");

                    b.Property<string>("Summary")
                        .HasColumnType("text");

                    b.Property<string>("Target")
                        .HasColumnType("text");

                    b.Property<string>("Title")
                        .HasColumnType("text");

                    b.HasKey("IdModule");

                    b.ToTable("PqModule");
                });

            modelBuilder.Entity("APICore_SoanDeThi.Models.PqSubMenu", b =>
                {
                    b.Property<long>("IdSubMenu")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<string>("AllowCode")
                        .HasColumnType("text");

                    b.Property<long?>("AllowPermit")
                        .HasColumnType("bigint");

                    b.Property<string>("GroupName")
                        .HasColumnType("text");

                    b.Property<string>("Icon")
                        .HasColumnType("text");

                    b.Property<long?>("IdMainMenu")
                        .HasColumnType("bigint");

                    b.Property<string>("Link")
                        .HasColumnType("text");

                    b.Property<string>("PageKey")
                        .HasColumnType("text");

                    b.Property<short?>("Position")
                        .HasColumnType("smallint");

                    b.Property<string>("Summary")
                        .HasColumnType("text");

                    b.Property<string>("Target")
                        .HasColumnType("text");

                    b.Property<string>("Title")
                        .HasColumnType("text");

                    b.HasKey("IdSubMenu");

                    b.ToTable("PqSubMenu");
                });

            modelBuilder.Entity("APICore_SoanDeThi.Models.SysAttachment", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<DateTime>("NgayTao")
                        .HasColumnType("timestamp without time zone");

                    b.Property<long>("NguoiTao")
                        .HasColumnType("bigint");

                    b.HasKey("Id");

                    b.ToTable("SysAttachment");
                });

            modelBuilder.Entity("APICore_SoanDeThi.Models.SysAttachmentDetail", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<long>("AttachmentId")
                        .HasColumnType("bigint");

                    b.Property<string>("GhiChu")
                        .HasColumnType("text");

                    b.Property<bool>("IsDisable")
                        .HasColumnType("boolean");

                    b.Property<string>("LoaiFile")
                        .HasColumnType("text");

                    b.Property<DateTime?>("NgaySua")
                        .HasColumnType("timestamp without time zone");

                    b.Property<DateTime>("NgayTao")
                        .HasColumnType("timestamp without time zone");

                    b.Property<long?>("NguoiSua")
                        .HasColumnType("bigint");

                    b.Property<long>("NguoiTao")
                        .HasColumnType("bigint");

                    b.Property<string>("TenFile")
                        .HasColumnType("text");

                    b.Property<string>("TenFileGoc")
                        .HasColumnType("text");

                    b.Property<string>("Type")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("SysAttachmentDetail");
                });

            modelBuilder.Entity("APICore_SoanDeThi.Models.ViewAccount", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<int?>("Authentype")
                        .HasColumnType("integer");

                    b.Property<DateTime>("Createddate")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("DPassword")
                        .HasColumnType("text");

                    b.Property<int?>("Defaultmodule")
                        .HasColumnType("integer");

                    b.Property<short?>("Disable")
                        .HasColumnType("smallint");

                    b.Property<string>("Email")
                        .HasColumnType("text");

                    b.Property<DateTime?>("Expirevalidate")
                        .HasColumnType("timestamp without time zone");

                    b.Property<DateTime?>("Exppassword")
                        .HasColumnType("timestamp without time zone");

                    b.Property<int?>("Faillogin")
                        .HasColumnType("integer");

                    b.Property<long?>("IdNv")
                        .HasColumnType("bigint");

                    b.Property<short?>("Isadmin")
                        .HasColumnType("smallint");

                    b.Property<short?>("Iscreateldapaccount")
                        .HasColumnType("smallint");

                    b.Property<DateTime>("Lastlogin")
                        .HasColumnType("timestamp without time zone");

                    b.Property<DateTime>("Lastpasschg")
                        .HasColumnType("timestamp without time zone");

                    b.Property<DateTime?>("Lastsend")
                        .HasColumnType("timestamp without time zone");

                    b.Property<short?>("Loaitaikhoan")
                        .HasColumnType("smallint");

                    b.Property<short?>("Lock")
                        .HasColumnType("smallint");

                    b.Property<string>("Password")
                        .HasColumnType("text");

                    b.Property<int?>("Solop")
                        .HasColumnType("integer");

                    b.Property<string>("Token")
                        .HasColumnType("text");

                    b.Property<string>("Username")
                        .HasColumnType("text");

                    b.Property<string>("Validatecode")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("ViewAccount");
                });

            modelBuilder.Entity("APICore_SoanDeThi.Models.ViewChucDanh", b =>
                {
                    b.Property<long>("IdRow")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<long?>("Cocauid")
                        .HasColumnType("bigint");

                    b.Property<short?>("Disable")
                        .HasColumnType("smallint");

                    b.Property<string>("Ghichu")
                        .HasColumnType("text");

                    b.Property<long?>("IdBp")
                        .HasColumnType("bigint");

                    b.Property<long?>("IdCapquanly")
                        .HasColumnType("bigint");

                    b.Property<long?>("IdCv")
                        .HasColumnType("bigint");

                    b.Property<long?>("IdParent")
                        .HasColumnType("bigint");

                    b.Property<short?>("Isleading")
                        .HasColumnType("smallint");

                    b.Property<short?>("Isstop")
                        .HasColumnType("smallint");

                    b.Property<DateTime?>("Lastmodified")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("Macd")
                        .HasColumnType("text");

                    b.Property<string>("Motacongviec")
                        .HasColumnType("text");

                    b.Property<long?>("Nguoisua")
                        .HasColumnType("bigint");

                    b.Property<long?>("Nhom")
                        .HasColumnType("bigint");

                    b.Property<int?>("Sonhanviencan")
                        .HasColumnType("integer");

                    b.Property<string>("Tenchucdanh")
                        .HasColumnType("text");

                    b.Property<string>("Tentienganh")
                        .HasColumnType("text");

                    b.Property<short?>("Visiblebophan")
                        .HasColumnType("smallint");

                    b.Property<short?>("Visiblecap")
                        .HasColumnType("smallint");

                    b.Property<int?>("Vitri")
                        .HasColumnType("integer");

                    b.Property<string>("Yeucaubangcap")
                        .HasColumnType("text");

                    b.Property<string>("Yeucaukynangkhac")
                        .HasColumnType("text");

                    b.Property<string>("Yeucaukynanglamviec")
                        .HasColumnType("text");

                    b.HasKey("IdRow");

                    b.ToTable("ViewChucDanh");
                });

            modelBuilder.Entity("APICore_SoanDeThi.Models.ViewCoCauToChuc", b =>
                {
                    b.Property<long>("Rowid")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<int?>("Capcocau")
                        .HasColumnType("integer");

                    b.Property<int?>("Chedolamviec")
                        .HasColumnType("integer");

                    b.Property<string>("Code")
                        .HasColumnType("text");

                    b.Property<long?>("Createdby")
                        .HasColumnType("bigint");

                    b.Property<DateTime?>("Createddate")
                        .HasColumnType("timestamp without time zone");

                    b.Property<long?>("Custemerid")
                        .HasColumnType("bigint");

                    b.Property<long?>("Deletedby")
                        .HasColumnType("bigint");

                    b.Property<DateTime?>("Deleteddate")
                        .HasColumnType("timestamp without time zone");

                    b.Property<short?>("Disable")
                        .HasColumnType("smallint");

                    b.Property<DateTime?>("Lastmodified")
                        .HasColumnType("timestamp without time zone");

                    b.Property<int?>("Loaidonvi")
                        .HasColumnType("integer");

                    b.Property<long?>("Modifiedby")
                        .HasColumnType("bigint");

                    b.Property<long?>("Parentid")
                        .HasColumnType("bigint");

                    b.Property<string>("Title")
                        .HasColumnType("text");

                    b.Property<int?>("Vitri")
                        .HasColumnType("integer");

                    b.HasKey("Rowid");

                    b.ToTable("ViewCoCauToChuc");
                });
#pragma warning restore 612, 618
        }
    }
}
