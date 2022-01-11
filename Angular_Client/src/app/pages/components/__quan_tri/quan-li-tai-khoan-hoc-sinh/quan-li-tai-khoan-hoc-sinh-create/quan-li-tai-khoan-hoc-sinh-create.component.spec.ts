import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanLiTaiKhoanHocSinhCreateComponent } from './quan-li-tai-khoan-hoc-sinh-create.component';

describe('QuanLiTaiKhoanHocSinhCreateComponent', () => {
  let component: QuanLiTaiKhoanHocSinhCreateComponent;
  let fixture: ComponentFixture<QuanLiTaiKhoanHocSinhCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuanLiTaiKhoanHocSinhCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuanLiTaiKhoanHocSinhCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
