import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PizzaCreateModalComponent } from './pizza-create-modal.component';

describe('PizzaCreateModalComponent', () => {
  let component: PizzaCreateModalComponent;
  let fixture: ComponentFixture<PizzaCreateModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ PizzaCreateModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PizzaCreateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
