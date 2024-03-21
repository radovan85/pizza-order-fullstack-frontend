import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartItemFormComponent } from './cart-item-form.component';

describe('CartItemFormComponent', () => {
  let component: CartItemFormComponent;
  let fixture: ComponentFixture<CartItemFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartItemFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CartItemFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
