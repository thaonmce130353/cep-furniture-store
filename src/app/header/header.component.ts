import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

import { SignalrService } from '../services/signalr.service';

import { Category } from '../Models/Category';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  keyword: string = "";

  @Input() isManagePageChecked: boolean;

  data: Category[] = [];
  unsubscribe$: Subject<boolean> = new Subject();

  constructor(private signalrService: SignalrService) { }

  ngOnInit(): void {
    this.signalrService.startConnection();
    this.signalrService.addTransferCategoryDataListener();
    this.fetchData();
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

  onChange(keyword: string) {
    this.keyword = keyword;
  }

  ngOnChanges() {
    console.log(this.isManagePageChecked);
  }
}
