import {Component } from '@angular/core';
import {Observable } from 'rxjs';
import {LoaderService } from './loader.service';
@Component({
  selector: 'ui-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent{
  visibleLoader$: Observable<boolean>
  constructor( loaderService: LoaderService) {
    this.visibleLoader$ =loaderService.isVisible()
  }
}
