import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SalesService } from 'src/app/services/sales.service';
import { CreateTransactionDTO } from 'src/app/models/CreateTransactionDTO';
import { ResponseDTO } from 'src/app/models/ResponseDTO';
import { MemberService } from 'src/app/services/member.service';
import { InventoryService } from 'src/app/services/inventory.service';
import { ProductDTO } from 'src/app/models/ProductDTO';
import { MemberDTO } from 'src/app/models/MemberDTO';
import { firstValueFrom } from 'rxjs';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-create-transaction-form',
  templateUrl: './create-transaction-form.component.html',
  styleUrls: ['./create-transaction-form.component.css']
})
export class CreateTransactionFormComponent implements OnInit {
  @Output() response = new EventEmitter<ResponseDTO>();
  @Output() exitForm = new EventEmitter();
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
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(1),
            Validators.maxLength(20)
          ]),
        ],
        productCode: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(1),
            Validators.maxLength(20)
          ]),
        ],
        transactionDate: [
          '',
          Validators.compose([
            Validators.required,
          ]),
        ],
        price: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(1),
            Validators.maxLength(20)
          ]),
        ],
        orderID: [
          '',
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
    let createForm = <CreateTransactionDTO>this.form.value;
    await this.salesService
      .createTransactions(createForm)
      .then((response) => {
        console.log('Successful Create');
        console.log(response);
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
