import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PizzaBucketComponent } from './pizza-bucket.component';

describe('PizzaBucketComponent', () => {
  let component: PizzaBucketComponent;
  let fixture: ComponentFixture<PizzaBucketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PizzaBucketComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PizzaBucketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
