import { Component, OnInit, ViewChild } from '@angular/core';
import { TransactionDTO } from 'src/app/models/TransactionDTO';
import { SalesService } from 'src/app/services/sales.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ResponseDTO } from 'src/app/models/ResponseDTO';
import * as FileSaver from 'file-saver';
import { saveAs } from 'file-saver';
import { AngularCsv } from 'angular-csv-ext/dist/Angular-csv';


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
    //this is use the actual api
    this.salesService.getTransactions().then(async (response) => {
      this.transactionList = response.message.sort((a, b) => a.orderID - b.orderID)
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

  async confirmDelete() {
    await this.salesService.deleteTransactions(this.currentTransaction).then(async (response) => {
      console.log(response)
      this.actionResult = response.message
      this.open(this.resultModal)
      this.getTransactions();
    })
      .catch((err) => {
        console.log(err);
        this.actionResult = "failed"
        this.open(this.resultModal)
        this.getTransactions()
      });
  }

  exportExcel() {
    new AngularCsv(this.transactionList, 'SalesReport');
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