import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PizzaUpdateFormComponent } from './pizza-update-form.component';

describe('PizzaUpdateFormComponent', () => {
  let component: PizzaUpdateFormComponent;
  let fixture: ComponentFixture<PizzaUpdateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PizzaUpdateFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PizzaUpdateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
