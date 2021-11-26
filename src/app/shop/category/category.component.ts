import { Component, OnInit, ElementRef, Output, EventEmitter, Input } from '@angular/core';

import { Category } from 'src/app/Models/Category';
import { CategoryService } from 'src/app/services/category.service';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  categories: Category[] = [];
  imagePath: string = environment.imageUrl;

  constructor(
    private categoryService: CategoryService,
    private el: ElementRef) { }

  ngOnInit(): void {
    this.getAllCategory();
  }

  elements: any = [];
  index: number = 0;
  ngAfterContentChecked() {
    this.elements = this.el.nativeElement.querySelectorAll('a.box');
  }

  getAllCategory(): void {
    this.categoryService
      .getAllCategory()
      .subscribe(categories => {
        this.categories = categories;
      });
  }

  @Input() category: number;
  @Output() categoryChange = new EventEmitter<number>();
  onCategoryChange(categogyId: number, index: number) {
    this.elements[this.index].classList.remove('active');
    this.index = index;
    this.elements[index].classList.add('active');

    this.categoryChange.emit(categogyId);
  }
}
