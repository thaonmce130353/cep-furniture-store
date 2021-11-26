import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  keyword: string = "";

  @Input() isManagePageChecked: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  onChange(keyword: string) {
    this.keyword = keyword;
  }

  ngOnChanges() {
    console.log(this.isManagePageChecked);
  }
}
