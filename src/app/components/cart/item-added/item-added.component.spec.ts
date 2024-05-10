import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemAddedComponent } from './item-added.component';

describe('ItemAddedComponent', () => {
  let component: ItemAddedComponent;
  let fixture: ComponentFixture<ItemAddedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemAddedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ItemAddedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
