import {Component, OnInit} from '@angular/core';
import {LoaderService} from './shared/loader/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit{

  constructor(private lo: LoaderService){}

  ngOnInit(){
    this.lo.hide(1000);
  }
}
