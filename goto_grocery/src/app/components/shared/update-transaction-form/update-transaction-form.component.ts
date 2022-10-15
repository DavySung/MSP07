import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SalesService } from 'src/app/services/sales.service';
import { TransactionDTO } from 'src/app/models/TransactionDTO';
import { formatDate } from '@angular/common';
import { ResponseDTO } from 'src/app/models/ResponseDTO';
import { MemberService } from 'src/app/services/member.service';
import { InventoryService } from 'src/app/services/inventory.service';
import { ProductDTO } from 'src/app/models/ProductDTO';
import { MemberDTO } from 'src/app/models/MemberDTO';
import { firstValueFrom, lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-update-transaction-form',
  templateUrl: './update-transaction-form.component.html',
  styleUrls: ['./update-transaction-form.component.css']
})
export class UpdateTransactionFormComponent implements OnInit {

  @Output() response = new EventEmitter<ResponseDTO>();
  @Output() exitForm = new EventEmitter();
  @Input() transactionDTO: TransactionDTO;
  form: FormGroup;
  isError: boolean;
  errMsg: string;
  submitted: boolean;
  message: string;

  loaded: boolean = false;

  currentproduct: ProductDTO;
  productList: ProductDTO[];
  currentMember: MemberDTO;
  memberList: MemberDTO[];


  get customerNumber() {
    return this.form.get('customerNumber');
  }
  get productCode() {
    return this.form.get('productCode');
  }
  get transactionDate() {
    return this.form.get('transactionDate');
  }
  get price() {
    return this.form.get('price');
  }
  get orderID() {
    return this.form.get('orderID');
  }

  constructor(
    public formBuilder: FormBuilder,
    private salesService: SalesService,
    private inventoryService: InventoryService,
    private memberService: MemberService,
  ) { }

  ngOnInit(): void {
    this.getFormData();
  }

  //get members to display
  async getFormData() {
    await this.memberService.getMembersDetails().then((response) => {
      this.memberList = response.message;
    })
      .catch((err) => {
        console.log(err);
        this.isError = true;
        this.message = err;
      });

    this.productList = await (await lastValueFrom(this.inventoryService.getAll())).message
    this.setupForm()
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
          formatDate(this.transactionDTO.transactionDate, 'yyyy-MM-dd', 'en'),
          Validators.compose([
            Validators.required,
          ]),
        ],
        price: [
          this.transactionDTO.price,
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
    this.loaded = true;
  }

  async goBack() {
    this.exitForm.emit();
  }

  async createTransaction() {
    this.submitted = true;
    let updatedForm = <TransactionDTO>this.form.value;
    updatedForm.id = this.transactionDTO.id;
    console.log(updatedForm)
    await this.salesService.
      updateTransactions(updatedForm)
      .then((response) => {
        console.log(response)
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
