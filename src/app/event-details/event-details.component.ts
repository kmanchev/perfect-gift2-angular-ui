import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ImageService } from '../image/shared/image.service';
import { UserService } from '../_services/user.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {
  images: any[];
  visibleImages: any[] = [];
  selectedFile: File = null;
  selectedEventId: String = null;

  constructor(
    private userService: UserService,
    private imageService: ImageService,
    private activated_route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.selectedEventId = this.activated_route.snapshot.paramMap.get('id');
    console.log(this.selectedEventId);
    this.imageService.getImages(this.selectedEventId).pipe(first()).subscribe(function (data) {
      this.visibleImages = data;
    });
  }

  ngOnChanges() {
    this.imageService.getImages(this.selectedEventId).pipe(first()).subscribe(function (data) {
      this.visibleImages = data;
    });;
  }

  onReturn(): void {
    this.router.navigate(['/events']);
  }

  onFileSelected(files: FileList) {
    this.selectedFile = files.item(0);
    console.log(this.selectedFile);
  }

  onUpload() {
    this.userService.uploadPhoto(this.selectedFile, this.selectedEventId).pipe(first())
      .subscribe(data => {
        console.log("success upload photo");
        console.log(data);
        this.imageService.getImages(this.selectedEventId).subscribe(function (data1) {
          this.visibleImages = data1;
          console.log(this.visibleImages);
        });
      },
        error => {
          console.log("not");
        });

    console.log("upload triggered");
  }

}
