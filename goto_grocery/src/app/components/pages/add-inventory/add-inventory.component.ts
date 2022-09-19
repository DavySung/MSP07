import { Component, OnInit } from '@angular/core';
import { InventoryService } from 'src/app/services/inventory.service';
import { ProductDTO } from 'src/app/services/models/ProductDTO';
import { FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-add-inventory',
  templateUrl: './add-inventory.component.html',
  styleUrls: ['./add-inventory.component.css']
})
export class AddInventoryComponent implements OnInit {
  
  newProduct: ProductDTO;
  formdata: any;

  constructor(private inventoryService: InventoryService) {
    
   
  }
  
  ngOnInit(): void {
   this.LoadForm();

  }

  LoadForm(){
    this.formdata = new FormGroup({
      product_code: new FormControl(""),
      product_name: new FormControl(""),
      product_price: new FormControl(""),
      product_desc: new FormControl(""),
      created_date: new FormControl("")

   });

  }

  onClickSubmit(data:any) {

    this.newProduct = { 
      id: 1, 
      product_code: data.product_code, 
      product_name: data.product_name, 
      product_desc: data.product_desc, 
      product_price: data.product_price, 
      created_date: data.created_date, }
      console.log("Submit!!!")
    console.log(this.newProduct)
  }

}
