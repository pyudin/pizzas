import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PizzaSortComponent } from './pizza-sort.component';

describe('PizzaSortComponent', () => {
  let component: PizzaSortComponent;
  let fixture: ComponentFixture<PizzaSortComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ PizzaSortComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PizzaSortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
