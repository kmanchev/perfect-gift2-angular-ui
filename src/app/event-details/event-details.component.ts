import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ImageService } from '../image/shared/image.service';
import { UserService } from '../_services/user.service';
import { first } from 'rxjs/operators';
import { Image } from '../_models/image';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {
  images: any[];
  visibleImages: any[];
  imagesToDelete: any[] = [];
  imagesToDeleteEnabled: boolean;
  visibleImagess: Observable<Image[]>;
  selectedFile: File = null;
  selectedEventId: String = null;
  currentUserId: String;

  constructor(
    private userService: UserService,
    private imageService: ImageService,
    private activated_route: ActivatedRoute,
    private router: Router
  ) { }


  ngOnInit() {
    var loggedUser = JSON.parse(localStorage.getItem('currentUser'));
    this.currentUserId = loggedUser._id;
    this.imagesToDeleteEnabled = false;
    this.selectedEventId = this.activated_route.snapshot.paramMap.get('id');

    this.visibleImagess = this.imageService.getImages(this.selectedEventId).pipe(
      tap(data => this.visibleImages = data)
    );

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
          console.log(data1);
        });
      },
        error => {
          console.log("not");
        });
  }

  onDeleteContent() {
    if (this.imagesToDeleteEnabled) {
      this.imagesToDeleteEnabled = false;
      this.imagesToDelete = [];
    } else {
      for (var i = 0; i < this.visibleImages.length; i++) {
        if (this.visibleImages[i].uploader == this.currentUserId) {
          this.imagesToDelete.push(this.visibleImages[i]);
        }
      }
      this.imagesToDeleteEnabled = true;
    }
  }

  deleteImage(image) {
    this.userService.deletePhoto(image.uploader, this.selectedEventId, image.name).pipe(first())
    .subscribe(data => {
      console.log("success delete photo: " + data);
      var spliceIndex = -1;
      for (var i = 0; i < this.visibleImages.length; i ++) {
        if (image.url == this.visibleImages[i].url) {
          spliceIndex = i;
          break;
        }
      }
      if (spliceIndex != -1) {
        this.visibleImages.splice(spliceIndex, 1);
      }

      var doDelSpliceIndex = -1
      for (var i = 0; i < this.imagesToDelete.length; i++) {
        if (image.url == this.imagesToDelete[i].url) {
          doDelSpliceIndex = i;
          break;
        }
      }
      if (doDelSpliceIndex != -1) {
        this.imagesToDelete.splice(doDelSpliceIndex, 1);
      }
    },
      error => {
        console.log("something went wrong while deleting");
        console.log(error);
      });
  }

}
