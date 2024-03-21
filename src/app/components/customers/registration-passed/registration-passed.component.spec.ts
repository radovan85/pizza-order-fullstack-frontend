import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationPassedComponent } from './registration-passed.component';

describe('RegistrationPassedComponent', () => {
  let component: RegistrationPassedComponent;
  let fixture: ComponentFixture<RegistrationPassedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrationPassedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistrationPassedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
