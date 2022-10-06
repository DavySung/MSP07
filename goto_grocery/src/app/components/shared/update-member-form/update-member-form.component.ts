import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MemberService } from 'src/app/services/member.service';
import { MemberDTO } from 'src/app/models/MemberDTO';
import { formatDate } from '@angular/common';
import { ResponseDTO } from 'src/app/models/ResponseDTO';

@Component({
  selector: 'app-update-member-form',
  templateUrl: './update-member-form.component.html',
  styleUrls: ['./update-member-form.component.css']
})
export class UpdateMemberFormComponent implements OnInit {
  @Output() response = new EventEmitter<ResponseDTO>();
  @Output() exitForm = new EventEmitter();
  @Input() memberDTO: MemberDTO;
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
          this.memberDTO.firstName ?? "",
          Validators.compose([
            Validators.required,
            Validators.minLength(1),
            Validators.maxLength(20)
          ]),
        ],
        lastName: [
          this.memberDTO.lastName ?? "",
          Validators.compose([
            Validators.required,
            Validators.minLength(1),
            Validators.maxLength(20)
          ]),
        ],
        email: [
          this.memberDTO.email ?? "",
          Validators.compose([
            Validators.required,
            Validators.email
          ]),
        ],
        phone: [
          this.memberDTO.phone ?? "",
          Validators.compose([
            Validators.required,
            Validators.minLength(1),
            Validators.maxLength(20)
          ]),
        ],
        addressFirstLine: [
          this.memberDTO.addressFirstLine ?? "",
          Validators.compose([
            Validators.required,
            Validators.minLength(1),
            Validators.maxLength(20)
          ]),
        ],
        addressSecondLine: [
          this.memberDTO.addressSecondLine ?? "",
          Validators.compose([
            Validators.minLength(1),
            Validators.maxLength(20)
          ]),
        ],
        addressSuburb: [
          this.memberDTO.addressSuburb ?? "",
          Validators.compose([
            Validators.required,
            Validators.minLength(1),
            Validators.maxLength(20)
          ]),
        ],
        addressState: [
          this.memberDTO.addressState ?? "",
          Validators.compose([
            Validators.required,
            Validators.minLength(1),
            Validators.maxLength(5)
          ]),
        ],
        addressPostcode: [
          this.memberDTO.addressPostcode ?? "",
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

  async updateMember() {
    this.submitted = true;
    let updatedForm = <MemberDTO>this.form.value;
    updatedForm.id = this.memberDTO.id;
    await this.memberService.
      updateMember(updatedForm)
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
