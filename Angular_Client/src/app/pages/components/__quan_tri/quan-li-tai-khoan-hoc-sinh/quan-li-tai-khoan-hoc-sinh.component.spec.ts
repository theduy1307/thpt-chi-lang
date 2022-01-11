import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanLiTaiKhoanHocSinhComponent } from './quan-li-tai-khoan-hoc-sinh.component';

describe('QuanLiTaiKhoanHocSinhComponent', () => {
  let component: QuanLiTaiKhoanHocSinhComponent;
  let fixture: ComponentFixture<QuanLiTaiKhoanHocSinhComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuanLiTaiKhoanHocSinhComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuanLiTaiKhoanHocSinhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
