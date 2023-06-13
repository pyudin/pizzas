import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PizzaBucketPageComponent } from './pizza-bucket-page.component';

describe('PizzaBucketPageComponent', () => {
  let component: PizzaBucketPageComponent;
  let fixture: ComponentFixture<PizzaBucketPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ PizzaBucketPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PizzaBucketPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
