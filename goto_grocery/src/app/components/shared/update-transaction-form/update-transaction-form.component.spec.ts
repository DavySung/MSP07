import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTransactionFormComponent } from './update-transaction-form.component';

describe('UpdateTransactionFormComponent', () => {
  let component: UpdateTransactionFormComponent;
  let fixture: ComponentFixture<UpdateTransactionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateTransactionFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateTransactionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
