import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {  FormControl } from '@angular/forms';
import { UploadFileComponent } from './../upload-file/upload-file.component';

@Component({
  selector: 'upload-img',
  templateUrl: './upload-img.component.html',
  styleUrls: ['./upload-img.component.css']
})
export class UploadImgComponent implements OnInit {

  @ViewChild(UploadFileComponent) uploadFileComponent!: UploadFileComponent;
  isLoader=false;
  @Input() control!: FormControl;
  @Input() height = 200;
  @Input() width = 200;
  constructor() { }

  ngOnInit(): void {
  }
  onUploadImage(imgUrl: string) {
    this.control.setValue(imgUrl);
  }
  click() {
    this.uploadFileComponent.click();
  }
  loader(load:any)
  {
    this.isLoader=load;
  }
}
