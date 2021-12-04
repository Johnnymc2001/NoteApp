import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { NoteCreateComponent } from './notes/note-create/note-create.component';
import { NoteEditComponent } from './notes/note-edit/note-edit.component';
import { NoteListComponent } from './notes/note-list/note-list.component';
import { AuthGuard } from './_guards/auth.guard';

const routes: Routes = [
  { path: '', component: NoteListComponent },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      { path: 'notes', component: NoteListComponent },
      { path: 'create', component: NoteCreateComponent },
      { path: 'edit/:id', component: NoteEditComponent },
    ],
  },
  { path: '**', component: NoteListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
