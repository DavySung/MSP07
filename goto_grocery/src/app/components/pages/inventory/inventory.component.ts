import { Component, OnInit } from '@angular/core';
import { InventoryService } from 'src/app/services/inventory.service';
import { ProductDTO } from 'src/app/models/ProductDTO';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  productList: ProductDTO[];
  testProtuct1: ProductDTO;
  testProtuct2: ProductDTO;
  isError: boolean;
  message: string;

  constructor(private inventoryService: InventoryService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.GetInvetory();
  }

  GetInvetory() {
    //test data
    this.testProtuct1 = { id: 1, product_code: "12", product_name: "test1", product_desc: "test1", product_price: "123", created_date: "1/1/1" }
    this.testProtuct2 = { id: 2, product_code: "435", product_name: "test2", product_desc: "test2", product_price: "123", created_date: "1/1/1" }
    this.productList = [this.testProtuct1, this.testProtuct2]

    //this is use the actual api
    // this.productService.inventoryService().then((response) => {
    //   this.memberList = response;
    // })
    // .catch((err) => {
    //   console.log(err);
    //   this.isError = true;
    //   this.message = err;
    // });
  }

  Edit(product: ProductDTO) {
    console.log(product);
  }
  //Modal
  closeModal: string;
    
  View(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
      this.closeModal = `Closed with: ${res}`;
    }, (res) => {
      this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
    });
  }

  Delete(content, product: ProductDTO) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
     //implement delete 
     if(res == "Delete"){
      this.closeModal = `Delete`;
      console.log("Yes")
      console.log(product.product_code)
     }else this.closeModal = `Closed with: ${res}`;
      
    }, (res) => {
      this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}
