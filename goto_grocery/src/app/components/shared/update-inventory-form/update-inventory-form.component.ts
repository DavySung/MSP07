import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { InventoryService } from 'src/app/services/inventory.service';
import { ProductDTO } from 'src/app/models/ProductDTO';
import { FormGroup, FormControl, FormBuilder,  Validators, AbstractControl } from '@angular/forms';
@Component({
  selector: 'app-update-inventory-form',
  templateUrl: './update-inventory-form.component.html',
  styleUrls: ['./update-inventory-form.component.css']
})

export class UpdateInventoryFormComponent implements OnInit {

  newProduct: ProductDTO;
  formdata: FormGroup;
 // updateForm: any;
  submitted: boolean = false;
  
  @Input() UpdateProduct: ProductDTO;
  @Output() updateChange:EventEmitter<ProductDTO> =new EventEmitter<ProductDTO>();
  get productCode() {
    return this.formdata.get('productCode');
  }

  get data(): ProductDTO {
    return this.inventoryService.inventory;
  }
  set data(value: ProductDTO) {
    this.inventoryService.inventory= value;
  }

  constructor(public formBuilder: FormBuilder,public inventoryService: InventoryService) {
   
  }
  
  ngOnInit(): void {
    this.LoadForm()
 //  console.log(this.UpdateProduct)
  }

  

  LoadForm( ){
   console.log(this.inventoryService.inventory)
   
    this.formdata = this.formBuilder.group({
      productCode:  [this.inventoryService.inventory.productCode, Validators.compose([

        Validators.required,
        Validators.minLength(2),
        Validators.pattern('[0-9]{5}'),
      ]) 
    ],
      product_name: [this.inventoryService.inventory.productName, Validators.compose(
        [
          Validators.required,
          Validators.minLength(2)]
      )],
      product_price: [this.inventoryService.inventory.productPrice, Validators.compose(
        [
        Validators.required,
        Validators.minLength(1),
        Validators.pattern('^\d+$||^\d+\.\d+$')]
        )]
      ,
      product_desc: [this.inventoryService.inventory.productDesc, 
      Validators.compose(
        [
          Validators.required,
          Validators.minLength(2),
      ]
      )],
      created_date: [this.inventoryService.inventory.createdDate, 
        Validators.compose([
          Validators.required,
      ])]

   });

  }
  get f(): { [key: string]: AbstractControl } {
    return this.formdata.controls;
  }

  Update(data:any) {
    this.updateChange.emit(this.UpdateProduct)
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
