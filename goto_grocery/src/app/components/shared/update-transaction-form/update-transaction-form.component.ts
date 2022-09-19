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

  get customer_number() {
    return this.form.get('customer_number');
  }
  get product_code() {
    return this.form.get('product_code');
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
        customer_number: [
          this.transactionDTO.customer_number,
          Validators.compose([
            Validators.required,
            Validators.minLength(1),
            Validators.maxLength(20)
          ]),
        ],
        product_code: [
          this.transactionDTO.product_code,
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
    await this.salesService.
      updateTransactions(updatedForm)
      .then((response) => {
        console.log('Successful Create');
      })
      .catch((response) => {

      });
  }
}