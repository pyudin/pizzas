import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PizzaFilterComponent } from './pizza-filter.component';

describe('PizzaFilterComponent', () => {
  let component: PizzaFilterComponent;
  let fixture: ComponentFixture<PizzaFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PizzaFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PizzaFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
