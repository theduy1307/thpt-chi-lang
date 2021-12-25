import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanLiTaiKhoanEditComponent } from './quan-li-tai-khoan-edit.component';

describe('QuanLiTaiKhoanEditComponent', () => {
  let component: QuanLiTaiKhoanEditComponent;
  let fixture: ComponentFixture<QuanLiTaiKhoanEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuanLiTaiKhoanEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuanLiTaiKhoanEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
