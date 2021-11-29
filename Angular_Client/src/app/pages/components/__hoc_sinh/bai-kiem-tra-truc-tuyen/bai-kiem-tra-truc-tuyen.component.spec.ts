import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaiKiemTraTrucTuyenComponent } from './bai-kiem-tra-truc-tuyen.component';

describe('BaiKiemTraTrucTuyenComponent', () => {
  let component: BaiKiemTraTrucTuyenComponent;
  let fixture: ComponentFixture<BaiKiemTraTrucTuyenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaiKiemTraTrucTuyenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaiKiemTraTrucTuyenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
