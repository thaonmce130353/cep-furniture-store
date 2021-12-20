import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subject, fromEvent } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

import { SignalrService } from '../services/signalr.service';
import { ProductService } from '../services/product.service';

import { Category } from '../Models/Category';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  searchKey: string = "";

  @Input() isManagePageChecked: boolean;

  data: string = '0';
  unsubscribe$: Subject<boolean> = new Subject();

  searchNames: string[] = [];
  isShowResult: boolean = true;

  constructor(
    private signalrService: SignalrService,
    private productService: ProductService) { }

  ngOnInit(): void {
    // this.signalrService.startConnection();
    // this.signalrService.addTransferCategoryDataListener();
    // this.fetchData();
  }

  ngAfterViewInit() {
    const searchBox = document.getElementById('search-box');
    const keyup$ = fromEvent(searchBox, 'keyup');

    keyup$
      .pipe(
        map((i: any) => i.currentTarget.value),
        debounceTime(500)
      )
      .subscribe(keyword => {
        this.productService.getSearchNamesOfProduct(keyword).subscribe(data => {
          this.searchNames = data;
          this.isShowResult = true;
        })
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }

  fetchData() {
    this.signalrService.getData().subscribe(data => {
      this.data = data;
    });
  }

  onSelectSearchName(keyword: string) {
    this.searchKey = keyword;
    this.isShowResult = false;
  }

  // ngOnChanges() {
  //   console.log(this.isManagePageChecked);
  // }
}
