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

  get customerNumber() {
    return this.form.get('customerNumber');
  }
  get productCode() {
    return this.form.get('productCode');
  }
  get transactionDate() {
    return this.form.get('transactionDate');
  }
  get productPriceID() {
    return this.form.get('productPriceID');
  }
  get orderID() {
    return this.form.get('orderID');
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
        customerNumber: [
          this.memberDTO.customerNumber,
          Validators.compose([
            Validators.required,
            Validators.minLength(1),
            Validators.maxLength(20)
          ]),
        ],
        productCode: [
          this.memberDTO.productCode,
          Validators.compose([
            Validators.required,
            Validators.minLength(1),
            Validators.maxLength(20)
          ]),
        ],
        transactionDate: [
          formatDate(this.memberDTO.transactionDate, 'yyyy-MM-dd', 'en'),
          Validators.compose([
            Validators.required,
          ]),
        ],
        productPriceID: [
          this.memberDTO.productPriceID,
          Validators.compose([
            Validators.required,
            Validators.minLength(1),
            Validators.maxLength(20)
          ]),
        ],
        orderID: [
          this.memberDTO.orderID,
          Validators.compose([
            Validators.required,
            Validators.minLength(1),
            Validators.maxLength(20)
          ]),
        ],
      }
    );
  }

  async goBack() {
    this.exitForm.emit();
  }

  async createTransaction() {
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
