import { Component, OnInit } from '@angular/core';
import { InventoryService } from 'src/app/services/inventory.service';
import { ProductDTO } from 'src/app/models/ProductDTO';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-update-inventory-form',
  templateUrl: './update-inventory-form.component.html',
  styleUrls: ['./update-inventory-form.component.css']
})

export class UpdateInventoryFormComponent implements OnInit {

  newProduct: ProductDTO;
  formdata: any;
  updateForm: any;
  submitted: boolean = false;

  constructor(private inventoryService: InventoryService) {
    
   
  }
  
  ngOnInit(): void {
   this.LoadForm();

  }

  LoadForm(){
    this.formdata = new FormGroup({
      product_code: new FormControl("", [
        Validators.required,
        Validators.minLength(2),
        Validators.pattern('[0-9]{5}'),
        
    ]),
      product_name: new FormControl("", 
      [
        Validators.required,
        Validators.minLength(2),
    ]),
      product_price: new FormControl("", 
      [
        Validators.required,
        Validators.minLength(1),
        Validators.pattern('^\d+$||^\d+\.\d+$'),
    ]),
      product_desc: new FormControl("", 
      [
        Validators.required,
        Validators.minLength(2),
    ]),
      created_date: new FormControl(new Date().toISOString().substring(0,10), [
        Validators.required,
    ])

   });

  }
  get f(): { [key: string]: AbstractControl } {
    return this.formdata.controls;
  }

  Update(data:any) {
    
    this.inventoryService.update(this.newProduct).subscribe(data => {
     
      console.log(this.newProduct)
      this.newProduct = { 
        id: 1, 
        productCode: data.product_code, 
        productName: data.product_name, 
        productDesc: data.product_desc, 
        productPrice: data.product_price, 
        createdDate: data.created_date, }
        console.log("Update!!!")
    })
  }

  

}
