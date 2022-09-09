import { Component, OnInit } from '@angular/core';
import { InventoryService } from 'src/app/services/inventory.service';
import { ProductDTO } from 'src/app/models/ProductDTO';

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

  constructor(private inventoryService: InventoryService) { }

  ngOnInit(): void {
    this.GetInvetory();
  }

  GetInvetory() {
    //test data
    this.testProtuct1 = { id: 1, product_code: "12", product_name: "test1", product_desc: "test1", product_price: "123", created_date: "1/1/1" }
    this.testProtuct2 = { id: 2, product_code: "123", product_name: "test2", product_desc: "test2", product_price: "123", created_date: "1/1/1" }
    this.productList = [this.testProtuct1, this.testProtuct1]

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

  View(product: ProductDTO) {
    console.log(product);
  }
  Edit(product: ProductDTO) {
    console.log(product);
  }
  Delete(product: ProductDTO) {
    console.log(product);
  }
}
