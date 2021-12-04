import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { TextInputComponent } from './_forms/text-input/text-input.component';
import { AuthComponent } from './auth/auth.component';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NoteListComponent } from './notes/note-list/note-list.component';
import { NoteCreateComponent } from './notes/note-create/note-create.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { LoadingInterceptor } from './_interceptors/busy.interceptor';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PaginationModule } from 'ngx-bootstrap/pagination';

@NgModule({
  declarations: [
    AppComponent,
    TextInputComponent,
    AuthComponent,
    NoteListComponent,
    NoteCreateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      progressBar: true,
      preventDuplicates: true,
      includeTitleDuplicates: true,
      resetTimeoutOnDuplicate: true,
    }),
    HttpClientModule,
    TabsModule,
    MatFormFieldModule,
    PaginationModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
