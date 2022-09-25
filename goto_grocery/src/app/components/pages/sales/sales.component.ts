import { Component, OnInit, ViewChild } from '@angular/core';
import { TransactionDTO } from 'src/app/models/TransactionDTO';
import { SalesService } from 'src/app/services/sales.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ResponseDTO } from 'src/app/models/ResponseDTO';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {
  currentTransaction: TransactionDTO;
  transactionList: TransactionDTO[];
  testTransaction1: TransactionDTO;
  testTransaction2: TransactionDTO;
  isError: boolean;
  message: string;

  //create
  createTransaction = false;

  //update
  updateTransaction = false;

  //result modal
  actionResult: any;
  action: string;

  //delete modal
  record: string;
  recordId: string;

  @ViewChild('viewModal') viewModal: any;
  @ViewChild('deleteModal') deleteModal: any;
  @ViewChild('resultModal') resultModal: any;

  constructor(private salesService: SalesService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getTransactions()
  }

  //get members to display
  getTransactions() {
    //test data
    // this.testTransaction1 = { id: 1, customer_number: '1', product_code: 'test1', transaction_date: "1/2", product_price: 123 }
    // this.testTransaction2 = { id: 2, customer_number: '2', product_code: 'test2', transaction_date: "1/2", product_price: 123 }
    // this.transactionList = [this.testTransaction1, this.testTransaction2]
    //this is use the actual api
    this.salesService.getTransactions().then(async (response) => {
      this.transactionList = response.message;
      // console.log(response)
    })
      .catch((err) => {
        console.log(err);
        this.isError = true;
        this.message = err;
      });
  }

  addTransaction() {
    //use TransactionRegisterDTO here
    this.createTransaction = true;
  }

  view(transaction: TransactionDTO) {
    this.currentTransaction = transaction;
    this.open(this.viewModal);
  }

  edit(transaction: TransactionDTO) {
    this.currentTransaction = transaction;
    this.updateTransaction = true;
  }

  delete(transaction: TransactionDTO) {
    this.action = "Delete";
    this.currentTransaction = transaction;
    this.open(this.deleteModal);
  }

  createFinished(response: ResponseDTO) {
    // console.log(response);
    this.actionResult = response.message
    this.open(this.resultModal)
    this.getTransactions()
  }

  updateFinished(response: ResponseDTO) {
    // console.log(response);
    this.actionResult = response.message
    this.open(this.resultModal)
    this.getTransactions()
  }

  confirmDelete() {
    this.salesService.deleteTransactions(this.currentTransaction).then((response) => {
      console.log(response)
      this.actionResult = response.success
      this.open(this.resultModal)
      this.getTransactions();
    })
      .catch((err) => {
        console.log(err);
        this.actionResult = "failed"
        this.open(this.resultModal)
      });
  }

  exitForm() {
    this.createTransaction = false;
    this.updateTransaction = false;
  }

  //modal components
  open(content: any) {
    this.modalService.open(content,
      {
        windowClass: 'modal-center'
      });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}