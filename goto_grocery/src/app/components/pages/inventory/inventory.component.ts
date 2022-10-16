import { Component, OnInit, ViewChild } from '@angular/core';
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

  get data(): ProductDTO {
    return this.inventoryService.inventory;
  }
  set data(value: ProductDTO) {
    this.inventoryService.inventory= value;
  }
  
  constructor(private inventoryService: InventoryService, private modalService: NgbModal, private router: Router) { }

  ngOnInit(): void {
    
    this.GetInventory();
  }

  GetInventory(){
    this.inventoryService.getAll().subscribe(data => {
      console.log("All Product", data);
      this.productList = data.message
    })
  }

  Edit(thisProduct: ProductDTO) {
    this.inventoryService.inventory = thisProduct;
    console.log(thisProduct);
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
