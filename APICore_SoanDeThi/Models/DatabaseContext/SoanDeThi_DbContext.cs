using APICore_SoanDeThi.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace APICore_SoanDeThi.Models.DatabaseContext
{
    public class SoanDeThi_DbContext : DbContext
    {
        public SoanDeThi_DbContext() { }
        public SoanDeThi_DbContext(DbContextOptions<SoanDeThi_DbContext> options) : base(options) { }
        public virtual DbSet<PqMainMenu> PqMainMenu { get; set; }
        public virtual DbSet<PqModule> PqModule { get; set; }
        public virtual DbSet<PqSubMenu> PqSubMenu { get; set; }
        public virtual DbSet<SysAttachment> SysAttachment { get; set; }
        public virtual DbSet<SysAttachmentDetail> SysAttachmentDetail { get; set; }
        public virtual DbSet<ViewCoCauToChuc> ViewCoCauToChuc { get; set; }
        public virtual DbSet<ViewAccount> ViewAccount { get; set; }
        public virtual DbSet<ViewChucDanh> ViewChucDanh { get; set; }
        public virtual DbSet<ViewNhanVien> ViewNhanVien { get; set; }
        public virtual DbSet<Question> Question { get; set; }
        public virtual DbSet<BaiKiemTra_Group> BaiKiemTra_Group { get; set; }
        public virtual DbSet<BaiKiemTra> BaiKiemTra { get; set; }
        public virtual DbSet<BaiKiemTra_ChiTiet> BaiKiemTra_ChiTiet { get; set; }
        public virtual DbSet<MonHoc> MonHoc { get; set; }
        public virtual DbSet<ChuongMonHoc> ChuongMonHoc { get; set; }
        public virtual DbSet<BaiHoc> BaiHoc { get; set; }
        public virtual DbSet<SysConfigDashboard> SysConfigDashboard { get; set; }
        public virtual DbSet<PqPermission> PqPermission { get; set; }
        public virtual DbSet<PqAccountPermit> PqAccountPermit { get; set; }
        public virtual DbSet<PqGroupPermit> PqGroupPermit { get; set; }
        public virtual DbSet<PqPermissionGroup> PqPermissionGroup { get; set; }
        public virtual DbSet<PqGroupAccount> PqGroupAccount { get; set; }
        public virtual DbSet<NienKhoa> NienKhoa { get; set; }
        public virtual DbSet<BaiKiemTra_TrucTuyen_Group> BaiKiemTra_TrucTuyen_Group { get; set; }
        public virtual DbSet<BaiKiemTra_TrucTuyen_ChiTiet> BaiKiemTra_TrucTuyen_ChiTiet { get; set; }
        public virtual DbSet<BaiKiemTra_TrucTuyen> BaiKiemTra_TrucTuyen { get; set; }
        public virtual DbSet<BaiKiemTra_TrucTuyen_HocSinh_ChiTiet> BaiKiemTra_TrucTuyen_HocSinh_ChiTiet { get; set; }
        public virtual DbSet<BaiKiemTra_TrucTuyen_HocSinh> BaiKiemTra_TrucTuyen_HocSinh { get; set; }
        public virtual DbSet<Lop> Lop { get; set; }
        public virtual DbSet<PqGroup> PqGroup { get; set; }
        public virtual DbSet<SysRequestLogin> SysRequestLogin { get; set; }
        public virtual DbSet<SysNotifyMaster> SysNotifyMaster { get; set; }
        public virtual DbSet<SysNotifyDetail> SysNotifyDetail { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                IConfigurationRoot configuration = new ConfigurationBuilder()
                   .SetBasePath(Directory.GetCurrentDirectory())
                   .AddJsonFile("appsettings.json")
                   .Build();
                optionsBuilder.UseNpgsql(configuration.GetConnectionString("PostgreConnection"));
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("ProductVersion", "2.2.6-servicing-10079");

            modelBuilder.Entity<PqGroupAccount>()
            .HasKey(o => new { o.IdGroup, o.UserName });

            modelBuilder.Entity<PqAccountPermit>()
            .HasKey(o => new { o.UserName, o.Code });

            modelBuilder.Entity<PqGroupPermit>()
            .HasKey(o => new { o.IdGroup, o.Code });
        }
    }
}
