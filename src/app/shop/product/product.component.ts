import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

import { Product } from 'src/app/Models/Product';
import { CurrentPage } from 'src/app/Models/CurrentPage';

import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @Input() categoryId: number;
  @Input() keyword: string = '';

  products: Product[] = [];
  page: number = 1;
  limit: number;
  lastPage: number;
  totalProduct: number;
  currentPage: CurrentPage;
  sortBy: string = "product";
  sortValue: number = -1;
  isNewChecked: boolean = false;

  isToggle: boolean = true;

  toggleDropdown() {
    this.isToggle = !this.isToggle;
  }

  constructor(private productService: ProductService) { }

  getCurrentProduct(): void {
    this.productService
      .getCurrentPageOfProduct(this.sortBy, this.sortValue, this.keyword, this.categoryId, this.page)
      .subscribe(result => {
        this.currentPage = result;
        this.products = this.currentPage.data;
        this.page = this.currentPage.page;
        this.limit = this.currentPage.limit;
        this.lastPage = this.currentPage.lastPage;
        this.totalProduct = this.currentPage.totalProduct;
      });
  }

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges) {
    this.page = 1;
    this.getCurrentProduct();
  }

  onChangePage(page: number) {
    this.page = page;
    this.getCurrentProduct();
  }

  handleSortBy(by: string, value: number) {
    this.isToggle = true;
    this.isNewChecked = false;
    this.sortBy = by;
    this.sortValue = value;
    this.getCurrentProduct();
  }

  onChangeNewChecked(isChecked: any) {
    this.isNewChecked = isChecked.currentTarget.checked;
    this.sortBy = "product";
    if (this.isNewChecked == true) {
      this.sortValue = 1;
    } else {
      this.sortValue = -1;
    }
    this.getCurrentProduct();
  }
}
