import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanLiTaiKhoanUpdateComponent } from './quan-li-tai-khoan-update.component';

describe('QuanLiTaiKhoanUpdateComponent', () => {
  let component: QuanLiTaiKhoanUpdateComponent;
  let fixture: ComponentFixture<QuanLiTaiKhoanUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuanLiTaiKhoanUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuanLiTaiKhoanUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
