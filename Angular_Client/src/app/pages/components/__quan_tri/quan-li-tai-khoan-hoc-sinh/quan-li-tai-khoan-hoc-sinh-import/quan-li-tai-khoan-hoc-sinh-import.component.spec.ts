import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanLiTaiKhoanHocSinhImportComponent } from './quan-li-tai-khoan-hoc-sinh-import.component';

describe('QuanLiTaiKhoanHocSinhImportComponent', () => {
  let component: QuanLiTaiKhoanHocSinhImportComponent;
  let fixture: ComponentFixture<QuanLiTaiKhoanHocSinhImportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuanLiTaiKhoanHocSinhImportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuanLiTaiKhoanHocSinhImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
