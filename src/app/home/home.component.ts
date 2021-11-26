import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  elements: any = [];
  index: number = 0;

  constructor(private el: ElementRef) { }

  ngOnInit(): void { }

  ngAfterViewInit() {
    this.elements = this.el.nativeElement.querySelectorAll('div.slide');
  }

  slidePrev(): void {
    this.elements[this.index].classList.remove('active-slide');
    this.index = (this.index - 1 + this.elements.length) % this.elements.length;
    this.elements[this.index].classList.add('active-slide');
  }

  slideNext(): void {
    this.elements[this.index].classList.remove('active-slide');
    this.index = (this.index + 1) % this.elements.length;
    this.elements[this.index].classList.add('active-slide');
  }

}
