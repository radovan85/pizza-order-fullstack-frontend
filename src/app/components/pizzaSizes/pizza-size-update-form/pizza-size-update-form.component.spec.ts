import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PizzaSizeUpdateFormComponent } from './pizza-size-update-form.component';

describe('PizzaSizeUpdateFormComponent', () => {
  let component: PizzaSizeUpdateFormComponent;
  let fixture: ComponentFixture<PizzaSizeUpdateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PizzaSizeUpdateFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PizzaSizeUpdateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
