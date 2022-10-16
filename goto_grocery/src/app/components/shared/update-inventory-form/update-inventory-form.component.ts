import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { InventoryService } from 'src/app/services/inventory.service';
import { ProductDTO } from 'src/app/models/ProductDTO';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-update-inventory-form',
  templateUrl: './update-inventory-form.component.html',
  styleUrls: ['./update-inventory-form.component.css']
})

export class UpdateInventoryFormComponent implements OnInit {

  form: FormGroup;
  submitted: boolean = false;

  get productCode() {
    return this.form.get('productCode');
  }

  get data(): ProductDTO {
    return this.inventoryService.inventory;
  }
  set data(value: ProductDTO) {
    this.inventoryService.inventory = value;
  }

  constructor(public formBuilder: FormBuilder, public inventoryService: InventoryService, private router: Router) {

  }

  ngOnInit(): void {
    this.LoadForm()
    console.log(this.inventoryService.inventory)
  }



  LoadForm() {
    try{
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
          productName: [
            this.inventoryService.inventory.productName,
            Validators.compose(
              [
                Validators.required,
                Validators.minLength(2)
              ]
            )],
          productDesc: [
            this.inventoryService.inventory.productDesc,
            Validators.compose([
              Validators.required,
              Validators.minLength(2),
            ])
          ],
        }
      );
    }catch{
      this.router.navigate(['Inventory']);
    }
    
  }

  Update(newNp: any) {
    newNp.id = this.inventoryService.inventory.id
    console.log(newNp);
    this.inventoryService.update(newNp).subscribe(data => {
      console.log("Update!!!")
    })
    this.router.navigate(['/Inventory']);
  }

}
