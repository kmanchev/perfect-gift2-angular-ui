import { Component } from '@angular/core';
import { ImageService } from '../shared/image.service';
import { ActivatedRoute } from '@angular/router'
import {Location} from '@angular/common';

@Component({
  templateUrl: './image-detail.component.html',
  styleUrls: ['./image-detail.component.css']
})
export class ImageDetailComponent {
  image:any

  constructor(
    private location: Location,
    private imageService: ImageService,
    private route: ActivatedRoute) { }

  ngOnInit(){
    this.image = this.imageService.getImage(
      +this.route.snapshot.params['id']
    )
  }

  return() {
    this.location.back();
  }
}