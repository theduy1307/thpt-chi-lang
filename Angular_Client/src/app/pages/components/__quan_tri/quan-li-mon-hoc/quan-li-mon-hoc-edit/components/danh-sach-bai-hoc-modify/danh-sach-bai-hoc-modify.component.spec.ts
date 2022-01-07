import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhSachBaiHocModifyComponent } from './danh-sach-bai-hoc-modify.component';

describe('DanhSachBaiHocModifyComponent', () => {
  let component: DanhSachBaiHocModifyComponent;
  let fixture: ComponentFixture<DanhSachBaiHocModifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DanhSachBaiHocModifyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhSachBaiHocModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
