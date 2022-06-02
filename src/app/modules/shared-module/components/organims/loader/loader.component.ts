import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { LoaderService } from './loader.service';
@Component({
  selector: 'ui-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  visibleLoader: boolean = false;
  constructor(public loaderService: LoaderService) {
    this.loaderService.isVisible().subscribe(visible => {
      setTimeout(() => {
        this.visibleLoader = visible;
    });

    })
  }

  ngOnInit(): void {
  }
}
