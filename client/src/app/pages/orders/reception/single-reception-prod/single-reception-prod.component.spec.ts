import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleReceptionProdComponent } from './single-reception-prod.component';

describe('SingleReceptionProdComponent', () => {
  let component: SingleReceptionProdComponent;
  let fixture: ComponentFixture<SingleReceptionProdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleReceptionProdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleReceptionProdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
