import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PizzaSizeFormComponent } from './pizza-size-form.component';

describe('PizzaSizeFormComponent', () => {
  let component: PizzaSizeFormComponent;
  let fixture: ComponentFixture<PizzaSizeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PizzaSizeFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PizzaSizeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
