import {
  Component, OnInit, ViewChild, ElementRef
} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-clip',
  templateUrl: './clip.component.html',
  styleUrls: ['./clip.component.css'],
})
export class ClipComponent implements OnInit {
  id = ''
  @ViewChild('videoPlayer', { static: true }) target?: ElementRef

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params.id;
    });
  }
}
