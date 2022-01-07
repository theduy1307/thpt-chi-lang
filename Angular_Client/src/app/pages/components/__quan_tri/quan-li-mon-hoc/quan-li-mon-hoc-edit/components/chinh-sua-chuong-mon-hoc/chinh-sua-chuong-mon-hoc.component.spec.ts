import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChinhSuaChuongMonHocComponent } from './chinh-sua-chuong-mon-hoc.component';

describe('ChinhSuaChuongMonHocComponent', () => {
  let component: ChinhSuaChuongMonHocComponent;
  let fixture: ComponentFixture<ChinhSuaChuongMonHocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChinhSuaChuongMonHocComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChinhSuaChuongMonHocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
