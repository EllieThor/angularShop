import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlusMinusIconsComponent } from './plus-minus-icons.component';

describe('PlusMinusIconsComponent', () => {
  let component: PlusMinusIconsComponent;
  let fixture: ComponentFixture<PlusMinusIconsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlusMinusIconsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlusMinusIconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
