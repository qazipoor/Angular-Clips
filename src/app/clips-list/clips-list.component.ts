import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-clips-list',
  templateUrl: './clips-list.component.html',
  styleUrls: ['./clips-list.component.css'],
})
export class ClipsListComponent implements OnInit, OnDestroy {
  constructor() {}

  ngOnInit(): void {
    window.addEventListener('scroll', this.handleScroll);
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    const { scrollTop, offsetHeight } = document.documentElement
    const { innerHeight } = window

    const bottomOfWindow = Math.round(scrollTop) + innerHeight === offsetHeight

    if (bottomOfWindow) {
      console.log('bottom of window');
      
    }
  }
}
