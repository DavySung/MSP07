import { Component, OnInit } from '@angular/core';
import { InventoryService } from 'src/app/services/inventory.service';
import { ProductDTO } from 'src/app/models/ProductDTO';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  productList: ProductDTO[];
  product: ProductDTO;
  isError: boolean;
  message: string;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private inventoryService: InventoryService, private modalService: NgbModal, private router: Router) { }

  ngOnInit(): void {
    this.GetInventory();
  }

  // GetInvetory() {
  //   //test data
  //   this.testProtuct1 = { id: 1, product_code: "12", product_name: "test1", product_desc: "test1", product_price: "123", created_date: "1/1/1" }
  //   this.testProtuct2 = { id: 2, product_code: "435", product_name: "test2", product_desc: "test2", product_price: "123", created_date: "1/1/1" }
  //   this.productList = [this.testProtuct1, this.testProtuct2]

  //   //this is use the actual api
  //   // this.productService.inventoryService().then((response) => {
  //   //   this.memberList = response;
  //   // })
  //   // .catch((err) => {
  //   //   console.log(err);
  //   //   this.isError = true;
  //   //   this.message = err;
  //   // });
  // }
  GetInventory(){
    this.inventoryService.getAll().subscribe(data => {
      console.log("All Product", data);
      this.productList = data;
    })
  }

  Edit(product: ProductDTO) {
    console.log(product);
    this.router.navigate(['/UpdateInventoryForm']);
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
      this.inventoryService.delete(product).subscribe((response)=>{
        console.log('response from post data is ', response);
        this.GetInventory();
      },(error)=>{
        console.log('error during post is ', error)
      })
  
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
