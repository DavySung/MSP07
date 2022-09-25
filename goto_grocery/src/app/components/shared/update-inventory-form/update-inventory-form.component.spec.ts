import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateInventoryFormComponent } from './update-inventory-form.component';

describe('UpdateInventoryFormComponent', () => {
  let component: UpdateInventoryFormComponent;
  let fixture: ComponentFixture<UpdateInventoryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateInventoryFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateInventoryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
