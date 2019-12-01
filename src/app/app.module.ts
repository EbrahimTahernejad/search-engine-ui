import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { HttpClientModule } from '@angular/common/http';

import { MatButtonModule, MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule, MatProgressSpinnerModule, MatDialogModule, MatSelectModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { ConfigDialogComponent } from './config-dialog/config-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchComponent,
    ConfigDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule, 
    MatCardModule, 
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatSelectModule
  ],
  providers: [],
  entryComponents: [ConfigDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
