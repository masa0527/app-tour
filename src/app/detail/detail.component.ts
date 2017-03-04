import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'detail-dialog',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit{

  tourData: any;
  bookMark: string;

  constructor(public dialogRef: MdDialogRef<DetailComponent>) {

  }

  ngOnInit(){
    this.bookMarkChange();
  }

  bookMarkChange(){
    this.bookMark = this.tourData.tourBool ? 'お気に入り解除' : 'お気に入りに登録';
  }

}
