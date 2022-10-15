import { Component, EventEmitter, OnInit } from '@angular/core';
import { InventoryService } from 'src/app/services/inventory.service';
import { ProductDTO } from 'src/app/models/ProductDTO';
import { FormGroup, FormControl, NgModel, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-inventory',
  templateUrl: './add-inventory.component.html',
  styleUrls: ['./add-inventory.component.css']
})
export class AddInventoryComponent implements OnInit {
  
  newProduct: ProductDTO;
  formdata: FormGroup;
  
  submitted: boolean = false;

  constructor(private inventoryService: InventoryService, private router: Router) {
    
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

  onClickSubmit(data:any) {
    this.submitted = true;
    this.newProduct = {
      id:data.id,
      productCode: data.product_code, 
      productName: data.product_name, 
      productDesc: data.product_desc, 
      createdDate: data.created_date, 
    }
    this.inventoryService.create(this.newProduct).subscribe((response)=>{
     
      this.newProduct.productCode = data.product_code;
      console.log('response from post data is ', response);
      console.log(this.newProduct);
    },(error)=>{
      console.log('error during post is ', error)
    })


    this.router.navigate(['/Inventory']);
    
  }

}
