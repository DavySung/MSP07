import { Component, OnInit } from '@angular/core';
import { TransactionDTO } from 'src/app/services/models/TransactionDTO';
import { SalesService } from 'src/app/services/sales.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {
  transactionList: TransactionDTO[];
  testTransaction1: TransactionDTO;
  testTransaction2: TransactionDTO;
  isError: boolean;
  message: string;

  constructor(private salesService: SalesService) { }

  ngOnInit(): void {
    this.GetTransactions()
  }

  //get members to display
  GetTransactions() {
    //test data
    this.testTransaction1 = { id: 1, customer_number: '1', product_code: 'test1', transaction_date: "1/2", product_price: 123 }
    this.testTransaction2 = { id: 2, customer_number: '2', product_code: 'test2', transaction_date: "1/2", product_price: 123 }
    this.transactionList = [this.testTransaction1, this.testTransaction2]
    //this is use the actual api
    // this.salesService.getTransactions().then((response) => {
    //   this.memberList = response;
    // })
    // .catch((err) => {
    //   console.log(err);
    //   this.isError = true;
    //   this.message = err;
    // });
  }

  AddMember() {
    //use MemberRegisterDTO here

  }

  View(member: TransactionDTO) {
    console.log(member);
  }
  Edit(member: TransactionDTO) {
    console.log(member);
  }
  Delete(member: TransactionDTO) {
    console.log(member);
  }
}