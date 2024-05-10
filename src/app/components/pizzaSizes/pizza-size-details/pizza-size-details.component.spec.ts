import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PizzaSizeDetailsComponent } from './pizza-size-details.component';

describe('PizzaSizeDetailsComponent', () => {
  let component: PizzaSizeDetailsComponent;
  let fixture: ComponentFixture<PizzaSizeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PizzaSizeDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PizzaSizeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
