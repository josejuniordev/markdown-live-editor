import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { EditorComponent } from './editor/editor.component';
import { ViewerComponent } from './viewer/viewer.component';
import {ReactiveFormsModule} from '@angular/forms';
import {EditorService} from './editor.service';


@NgModule({
  declarations: [
    AppComponent,
    EditorComponent,
    ViewerComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
  ],
  providers: [EditorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
