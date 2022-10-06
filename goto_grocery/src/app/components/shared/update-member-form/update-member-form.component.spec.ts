import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMemberFormComponent } from './update-member-form.component';

describe('UpdateMemberFormComponent', () => {
  let component: UpdateMemberFormComponent;
  let fixture: ComponentFixture<UpdateMemberFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateMemberFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateMemberFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
