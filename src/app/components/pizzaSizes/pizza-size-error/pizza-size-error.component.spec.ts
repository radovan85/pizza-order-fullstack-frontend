import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PizzaSizeErrorComponent } from './pizza-size-error.component';

describe('PizzaSizeErrorComponent', () => {
  let component: PizzaSizeErrorComponent;
  let fixture: ComponentFixture<PizzaSizeErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PizzaSizeErrorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PizzaSizeErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
