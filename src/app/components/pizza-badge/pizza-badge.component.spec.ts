import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PizzaBadgeComponent } from './pizza-badge.component';

describe('PizzaBadgeComponent', () => {
  let component: PizzaBadgeComponent;
  let fixture: ComponentFixture<PizzaBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PizzaBadgeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PizzaBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });
});
