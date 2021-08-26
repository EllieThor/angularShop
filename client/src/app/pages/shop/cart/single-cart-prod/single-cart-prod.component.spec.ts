import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleCartProdComponent } from './single-cart-prod.component';

describe('SingleCartProdComponent', () => {
  let component: SingleCartProdComponent;
  let fixture: ComponentFixture<SingleCartProdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleCartProdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleCartProdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
