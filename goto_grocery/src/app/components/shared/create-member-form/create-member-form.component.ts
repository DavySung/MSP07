import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MemberService } from 'src/app/services/member.service';
import { MemberRegisterDTO } from 'src/app/models/MemberRegisterDTO';
import { formatDate } from '@angular/common';
import { ResponseDTO } from 'src/app/models/ResponseDTO';


@Component({
  selector: 'app-create-member-form',
  templateUrl: './create-member-form.component.html',
  styleUrls: ['./create-member-form.component.css']
})
export class CreateMemberFormComponent implements OnInit {

  @Output() response = new EventEmitter<ResponseDTO>();
  @Output() exitForm = new EventEmitter();
  @Input() memberDTO: MemberRegisterDTO;
  form: FormGroup;
  isError: boolean;
  errMsg: string;
  submitted: boolean;

  get firstName() {
    return this.form.get('firstName');
  }
  get lastName() {
    return this.form.get('lastName');
  }
  get email() {
    return this.form.get('email');
  }
  get phone() {
    return this.form.get('phone');
  }
  get addressFirstLine() {
    return this.form.get('addressFirstLine');
  }
  get addressSecondLine() {
    return this.form.get('addressSecondLine');
  }
  get addressSuburb() {
    return this.form.get('addressSuburb');
  }
  get addressState() {
    return this.form.get('addressState');
  }
  get addressPostcode() {
    return this.form.get('addressPostcode');
  }

  constructor(
    public formBuilder: FormBuilder,
    private memberService: MemberService,
  ) { }

  ngOnInit(): void {
    this.setupForm();
  }

  setupForm() {
    this.form = this.formBuilder.group(
      {
        firstName: [
          "",
          Validators.compose([
            Validators.required,
            Validators.minLength(1),
            Validators.maxLength(20)
          ]),
        ],
        lastName: [
          "",
          Validators.compose([
            Validators.required,
            Validators.minLength(1),
            Validators.maxLength(20)
          ]),
        ],
        email: [
          "",
          Validators.compose([
            Validators.required,
            Validators.email
          ]),
        ],
        phone: [
          "",
          Validators.compose([
            Validators.required,
            Validators.minLength(1),
            Validators.maxLength(20)
          ]),
        ],
        addressFirstLine: [
          "",
          Validators.compose([
            Validators.required,
            Validators.minLength(1),
            Validators.maxLength(20)
          ]),
        ],
        addressSecondLine: [
          "",
          Validators.compose([
            Validators.minLength(1),
            Validators.maxLength(20)
          ]),
        ],
        addressSuburb: [
          "",
          Validators.compose([
            Validators.required,
            Validators.minLength(1),
            Validators.maxLength(20)
          ]),
        ],
        addressState: [
          "",
          Validators.compose([
            Validators.required,
            Validators.minLength(1),
            Validators.maxLength(5)
          ]),
        ],
        addressPostcode: [
          "",
          Validators.compose([
            Validators.required,
            Validators.minLength(1),
            Validators.maxLength(4)
          ]),
        ],
      }
    );
  }

  async goBack() {
    this.exitForm.emit();
  }

  async createMember() {
    this.submitted = true;
    let createdForm = <MemberRegisterDTO>this.form.value;
    await this.memberService.
    createMember(createdForm)
      .then((response) => {
        this.response.emit(response)
        this.exitForm.emit();
      })
      .catch((response) => {
        console.log('Failed Create');
        this.response.emit(response)
        this.exitForm.emit();
      });
  }
}

