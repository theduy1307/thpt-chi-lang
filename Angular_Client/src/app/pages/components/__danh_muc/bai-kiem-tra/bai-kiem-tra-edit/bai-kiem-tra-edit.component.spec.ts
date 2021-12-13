import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaiKiemTraEditComponent } from './bai-kiem-tra-edit.component';

describe('BaiKiemTraEditComponent', () => {
  let component: BaiKiemTraEditComponent;
  let fixture: ComponentFixture<BaiKiemTraEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaiKiemTraEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaiKiemTraEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
