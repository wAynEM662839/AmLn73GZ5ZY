// 代码生成时间: 2025-09-20 13:27:24
 * maintainability and extensibility.
 */

// Import required Ionic components and services
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { ImageResize } from '@ionic-native/image-resize';
import { Camera, CameraOptions } from '@ionic-native/camera';

@IonicPage()
@Component({
  selector: 'page-image-resizer',
  templateUrl: 'image-resizer.html',
})
export class ImageResizerPage {
  
  // Holds the list of selected images
  selectedImages: any[] = [];
  
  // Holds the resized images
  resizedImages: any[] = [];
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    private file: File,
    private imageResize: ImageResize,
    private camera: Camera
  ) {
  }
  
  // Function to select images from the device
  selectImages() {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };
    this.camera.getPictures(options).then((pictures) => {
      this.selectedImages = pictures;
    }, (err) => {
      console.error('Error selecting images: ', err);
    });
  }
  
  // Function to resize the selected images
  resizeImages() {
    let loader = this.loadingCtrl.create({ content: 'Resizing images...' });
    loader.present();
    
    this.selectedImages.forEach((image, index) => {
      this.imageResize.resize(image, 800, 600, 'JPEG', 75)
        .then((resizedImage) => {
          this.resizedImages.push(resizedImage);
          
          if (index === this.selectedImages.length - 1) {
            loader.dismiss();
          }
        })
        .catch((err) => {
          console.error('Error resizing image: ', err);
          loader.dismiss();
        });
    });
  }
  
  // Function to save the resized images to the device
  saveResizedImages() {
    this.resizedImages.forEach((resizedImage) => {
      this.file.writeFile(resizedImage, 'resized_image.jpg', 'jpg')
        .then(() => {
          console.log('Image saved successfully');
        })
        .catch((err) => {
          console.error('Error saving image: ', err);
        });
    });
  }
}

/*
 * HTML Template for the ImageResizerPage
 *
 * This template should be placed in the 'image-resizer.html' file.
 */

<ion-header>
  <ion-navbar>
    <ion-title>
      Image Resizer
    </ion-title>
  </ion-navbar>
</ion-header>

<ion-content padding>
  <button ion-button block (click)="selectImages()">Select Images</button>
  <button ion-button block (click)="resizeImages()">Resize Images</button>
  <button ion-button block (click)="saveResizedImages()" *ngIf="resizedImages.length > 0">Save Resized Images</button>
  
  <!-- Display resized images -->
  <ion-list *ngFor="let image of resizedImages">
    <ion-item>
      <img [src]="image" />
    </ion-item>
  </ion-list>
</ion-content>