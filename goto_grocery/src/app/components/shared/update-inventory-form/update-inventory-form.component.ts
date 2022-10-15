import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { InventoryService } from 'src/app/services/inventory.service';
import { ProductDTO } from 'src/app/models/ProductDTO';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-inventory-form',
  templateUrl: './update-inventory-form.component.html',
  styleUrls: ['./update-inventory-form.component.css']
})

export class UpdateInventoryFormComponent implements OnInit {

  newProduct: ProductDTO;
  form: FormGroup;
  // updateForm: any;
  submitted: boolean = false;

  @Input() UpdateProduct: ProductDTO;
  @Output() updateChange: EventEmitter<ProductDTO> = new EventEmitter<ProductDTO>();
  get productCode() {
    return this.form.get('productCode');
  }

  get data(): ProductDTO {
    return this.inventoryService.inventory;
  }
  set data(value: ProductDTO) {
    this.inventoryService.inventory = value;
  }

  constructor(public formBuilder: FormBuilder, public inventoryService: InventoryService) {

  }

  ngOnInit(): void {
    this.LoadForm()
    console.log(this.inventoryService.inventory)
  }



  LoadForm() {
    this.form = this.formBuilder.group(
      {
        productCode: [
          this.inventoryService.inventory.productCode,
          Validators.compose([

            Validators.required,
            Validators.minLength(2),
            Validators.pattern('[0-9]{5}')
          ]),
        ]
        ,
        product_name: [
          this.inventoryService.inventory.productName,
          Validators.compose(
            [
              Validators.required,
              Validators.minLength(2)
            ]
          )],
        product_desc: [
          this.inventoryService.inventory.productDesc,
          Validators.compose([
            Validators.required,
            Validators.minLength(2),
          ])
        ],
        created_date: [
          this.inventoryService.inventory.createdDate,
          Validators.compose([
            Validators.required,
          ])
        ]
      }
    );
  }

  Update(data: any) {
    this.updateChange.emit(this.UpdateProduct)
    this.inventoryService.update(this.newProduct).subscribe(data => {

      console.log(this.newProduct)
      this.newProduct = {
        id: data.message.id,
        productCode: data.message.product_code,
        productName: data.message.product_name,
        productDesc: data.message.roduct_desc,
        createdDate: data.message.created_date,
      }

      console.log("Update!!!")
    })
  }



}
