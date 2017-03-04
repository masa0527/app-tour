import {Component, OnInit, ViewContainerRef, HostListener, ViewChild} from '@angular/core';
import { MdDialog, MdDialogConfig, MdSidenav, MdSnackBar } from '@angular/material';

import { DetailComponent } from '../detail/detail.component';
import { TourService } from '../service/tour.service';

export interface area {
  code: string,
  name: string,
  data: any
}

@Component({
  selector: 'app-tour',
  templateUrl: './tour.component.html',
  styleUrls: ['./tour.component.scss']
})
export class TourComponent implements OnInit {

  tourObj;
  selectedData;
  bookmarks;
  isMobile = false;
  MOBILE_SCREEN_WIDTH = 768;
  areas: area[] = [
    {code: 'AAS', name:'アジア', data: null },
    {code: 'BCH', name: 'ビーチリゾート', data: null},
    {code: 'EUR', name: 'ヨーロッパ', data: null},
    {code: 'HWI', name: 'ハワイ', data: null },
    {code: 'DUS', name: 'アメリカ', data: null},
    {code: 'FOC', name: 'オセアニア', data: null},
    {code: 'CAF', name: 'アフリカ・他', data: null},
    {code: 'BOOKMARK', name: 'お気に入り', data: null},
  ];
  viewContainerRef;

  bookmarkStr = 'bookmark_border';

  @ViewChild(MdSidenav) sidenav: MdSidenav;


  public constructor(private tourService: TourService,
                     viewContainerRef: ViewContainerRef,
                     private dialog: MdDialog,
                     snackBar: MdSnackBar) {
    this.viewContainerRef = viewContainerRef;
  }

  ngOnInit() {
    this.getTour();
    this.initBookmarks();
    this.onScreenResize();
    this.onAreaChange(7);
  }

  getTour() {
    this.selectedData = null;
    for (let i = 0; i < this.areas.length; i++) {
      let areaCode = this.areas[i].code;
      if (areaCode === 'BOOKMARK') {
        continue;
      }
      this.tourService.getTourData(areaCode)
        .subscribe(
          result => this.setTour(result, i),
          error => console.log('通信エラー\n' + error)
        );
    }
  }

  setTour(result, i) {
    if (result.error) {
      alert('Web APIエラー\n' + result.message);
      return;
    }
    this.areas[i].data = result;
  }

    onAreaChange(index) {
    let area = this.areas[index];
    if (area.code === 'BOOKMARK') {
      if (Object.keys(this.bookmarks).length === 0) {
        //alert('ブックマークが登録されていません');
        return;
      }
      this.selectedData = Object.keys(this.bookmarks)
        .map(key => this.bookmarks[key]);
    } else {
      this.selectedData = area.data.data;
    }
    this.sidenav.close();
    setTimeout(scroll(0, 0), 1);
  }

  initBookmarks() {
    let storeData = localStorage.getItem('bookmarks');
    if (storeData) {
      this.bookmarks = JSON.parse(storeData);
    } else {
      this.bookmarks = {};
    }
  }


  onBookmarkClick(tourID, index) {

    if (!this.isMarked(tourID)) {
      if (Object.keys(this.bookmarks).length === 10) {
        return alert('Bookmarkは最大10件です');
      }
      this.bookmarks[tourID] = this.selectedData[index];
    } else {
      delete this.bookmarks[tourID];
    }
    localStorage.setItem(
      'bookmarks', JSON.stringify(this.bookmarks));
  }

  isMarked(tourID) {
    return this.bookmarks[tourID];
  }

  onDetailClick(index) {
    let config = new MdDialogConfig();
    config.viewContainerRef = this.viewContainerRef;
    this.tourObj = this.selectedData[index];
    let dialogRef = this.dialog.open(DetailComponent, config);
    dialogRef.componentInstance.tourData = {tour: this.tourObj, tourBool:this.isMarked(this.tourObj.id)};
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.onBookmarkClick(result, index);
      }
    })
  }

  @HostListener('window:resize')
  onScreenResize() {
    this.isMobile = (innerWidth < this.MOBILE_SCREEN_WIDTH);
  }

}
