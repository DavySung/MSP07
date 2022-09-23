import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SalesService } from 'src/app/services/sales.service';
import { TransactionDTO } from 'src/app/models/TransactionDTO';

@Component({
  selector: 'app-update-transaction-form',
  templateUrl: './update-transaction-form.component.html',
  styleUrls: ['./update-transaction-form.component.css']
})
export class UpdateTransactionFormComponent implements OnInit {

  @Output() successfulCreateTransaction = new EventEmitter();
  @Output() exitForm = new EventEmitter();
  @Input() transactionDTO: TransactionDTO;
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
    private salesService: SalesService,
  ) { }

  ngOnInit(): void {
    this.setupForm();
  }

  setupForm() {
    this.form = this.formBuilder.group(
      {
        customerNumber: [
          this.transactionDTO.customerNumber,
          Validators.compose([
            Validators.required,
            Validators.minLength(1),
            Validators.maxLength(20)
          ]),
        ],
        productCode: [
          this.transactionDTO.productCode,
          Validators.compose([
            Validators.required,
            Validators.minLength(1),
            Validators.maxLength(20)
          ]),
        ],
        transactionDate: [
          this.transactionDTO.transactionDate,
          Validators.compose([
            Validators.required,
          ]),
        ],
        productPriceID: [
          this.transactionDTO.productPriceID,
          Validators.compose([
            Validators.required,
            Validators.minLength(1),
            Validators.maxLength(20)
          ]),
        ],
        orderID: [
          this.transactionDTO.orderID,
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
    let updatedForm = <TransactionDTO>this.form.value;
    updatedForm.id = this.transactionDTO.id;
    await this.salesService.
      updateTransactions(updatedForm)
      .then((response) => {
        console.log('Successful Create');
      })
      .catch((response) => {

      });
  }
}