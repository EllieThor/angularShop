import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleProdCardComponent } from './single-prod-card.component';

describe('SingleProdCardComponent', () => {
  let component: SingleProdCardComponent;
  let fixture: ComponentFixture<SingleProdCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleProdCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleProdCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
