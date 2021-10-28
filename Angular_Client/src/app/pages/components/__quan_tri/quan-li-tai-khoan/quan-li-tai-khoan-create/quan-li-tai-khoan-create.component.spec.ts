import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanLiTaiKhoanCreateComponent } from './quan-li-tai-khoan-create.component';

describe('QuanLiTaiKhoanCreateComponent', () => {
  let component: QuanLiTaiKhoanCreateComponent;
  let fixture: ComponentFixture<QuanLiTaiKhoanCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuanLiTaiKhoanCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuanLiTaiKhoanCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
