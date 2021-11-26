import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/Models/Product';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {

  @Input() Product!: Product;

  imagePath: string = environment.imageUrl;
  // url: string = this.REST_API_SERVICE + `/Product/${this.Product.id}`;
  constructor() { }

  ngOnInit(): void {
  }

}
