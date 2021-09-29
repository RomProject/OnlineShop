import { CoreModule } from './core/core.module';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MainComponent } from './main/main.component';
import { RegisterComponent } from './register/register.component';
import { ShoppingComponent } from './shopping/shopping.component';
import { OrderComponent } from './order/order.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from './core';
import { LoaderComponent } from './loader/loader.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { UploadImgComponent } from './upload-img/upload-img.component';
import { FileUploadModule } from 'ng2-file-upload';
import { ImagePipe } from './image.pipe';
@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    RegisterComponent,
    ShoppingComponent,
    OrderComponent,
    LoaderComponent,
    UploadFileComponent,
    UploadImgComponent,
    ImagePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    FileUploadModule
  ],
  providers: [{
    provide: APP_INITIALIZER,
    useFactory: (
      us: UserService,

    ) =>
      function () {

        return new Promise((resolve, reject) => {
          us.contextPopulate()
            .subscribe((user: any) => {
              resolve(true);
            }, error => resolve(error));
        })
      },
    deps: [UserService,],
    multi: true,
  },],
  bootstrap: [AppComponent]
})
export class AppModule { }
