import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../Models/Product';
import { CurrentPage } from '../Models/CurrentPage';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss'],
})
export class ManagementComponent implements OnInit {

  products: Product[] = [];
  currentPage: CurrentPage;
  page: number = 1;
  limit: number;
  lastPage: number;
  totalProduct: number;
  sortBy: string = "product";
  sortValue: number = -1;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    // this.getAllProduct();
  }

  getCurrentProduct(): void {
    this.productService
      .getCurrentPageOfProduct("product", -1, "", 0, this.page)
      .subscribe(result => {
        this.currentPage = result;
        this.products = this.currentPage.data;
        this.page = this.currentPage.page;
        this.limit = this.currentPage.limit;
        this.lastPage = this.currentPage.lastPage;
        this.totalProduct = this.currentPage.totalProduct;
      });
  }
}
