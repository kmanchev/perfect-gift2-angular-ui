import { Component } from '@angular/core';
import { ImageService } from '../shared/image.service';
import { ActivatedRoute } from '@angular/router'
import {Location} from '@angular/common';

@Component({
  templateUrl: './image-detail.component.html',
  styleUrls: ['./image-detail.component.css']
})
export class ImageDetailComponent {
  url:any

  constructor(
    private location: Location,
    private imageService: ImageService,
    private route: ActivatedRoute) { }

  ngOnInit(){
    
    this.url = this.route.snapshot.params['url'];
    console.log(this.url);
  }

  return() {
    this.location.back();
  }
}