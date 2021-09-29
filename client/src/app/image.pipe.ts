import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {
  imgSrc = '/images/user.png';



  // args description:
  // args[0] 1 : for tournaments
  transform(image: string): string {

    if (image && (image.includes('http') || image.includes('https'))) {
      return image;
    } else if (image && image !== '') {
      return environment.fileUrl +"/"+ image;
    }
      return environment.fileUrl + this.imgSrc;
    }
  }


