import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTransactionFormComponent } from './create-transaction-form.component';

describe('CreateTransactionFormComponent', () => {
  let component: CreateTransactionFormComponent;
  let fixture: ComponentFixture<CreateTransactionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateTransactionFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateTransactionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
