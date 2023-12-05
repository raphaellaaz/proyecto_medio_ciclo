import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetInputComponent } from './pet-input.component';

describe('PetInputComponent', () => {
  let component: PetInputComponent;
  let fixture: ComponentFixture<PetInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PetInputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PetInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
