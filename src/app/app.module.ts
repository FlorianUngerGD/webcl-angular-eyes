import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EyesComponent } from './eyes/eyes.component';
import { EyeComponent } from './eye/eye.component';

@NgModule({
  declarations: [
    AppComponent,
    EyesComponent,
    EyeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
