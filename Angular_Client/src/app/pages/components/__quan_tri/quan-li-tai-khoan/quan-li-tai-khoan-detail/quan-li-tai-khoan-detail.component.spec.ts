import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanLiTaiKhoanDetailComponent } from './quan-li-tai-khoan-detail.component';

describe('QuanLiTaiKhoanDetailComponent', () => {
  let component: QuanLiTaiKhoanDetailComponent;
  let fixture: ComponentFixture<QuanLiTaiKhoanDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuanLiTaiKhoanDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuanLiTaiKhoanDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
