import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PizzaSizeListComponent } from './pizza-size-list.component';

describe('PizzaSizeListComponent', () => {
  let component: PizzaSizeListComponent;
  let fixture: ComponentFixture<PizzaSizeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PizzaSizeListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PizzaSizeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
