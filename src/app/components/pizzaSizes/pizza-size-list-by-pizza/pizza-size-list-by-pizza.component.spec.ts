import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PizzaSizeListByPizzaComponent } from './pizza-size-list-by-pizza.component';

describe('PizzaSizeListByPizzaComponent', () => {
  let component: PizzaSizeListByPizzaComponent;
  let fixture: ComponentFixture<PizzaSizeListByPizzaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PizzaSizeListByPizzaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PizzaSizeListByPizzaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
