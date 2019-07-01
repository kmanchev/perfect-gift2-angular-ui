import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ImageService } from '../image/shared/image.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {
  images: any[];
  visibleImages: any[] = [];

  constructor(
    private imageService: ImageService,
    private activated_route: ActivatedRoute,
    private router: Router
  ) {
    this.visibleImages = this.imageService.getImages();
  }

  ngOnInit() {
    let id = this.activated_route.snapshot.paramMap.get('id');
    console.log(id);
  }

  ngOnChanges() {
    this.visibleImages = this.imageService.getImages();
  }

  onReturn(): void {
    this.router.navigate(['/events']);
  }

}
