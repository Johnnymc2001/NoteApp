import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Note } from 'src/app/_models/note';
import { Pagination } from 'src/app/_models/pagination';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { NoteService } from 'src/app/_services/note.service';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css']
})
export class NoteListComponent implements OnInit {
  user: User;
  notes: Note[];
  pagination: Pagination;

  constructor(public noteService : NoteService, public accountService: AccountService, private toastr: ToastrService) {
    this.pagination = this.noteService.getParams();
  }

  ngOnInit(): void {
    this.accountService.currentUser$.subscribe(user => this.user = user);
    if (this.user != null) {
      this.loadNotes();
    }
  }

  loadNotes() {
    this.noteService.setParams(this.pagination);
    this.noteService.getNotes(this.pagination).subscribe(response => {
      this.notes = response.result;
      this.pagination = response.pagination;
    })
  }

  deleteNote(id: number) {
    this.noteService.deleteNote(id).subscribe((resp) => {
      this.toastr.success('Note Deleted!');

    });
  }

  pageChanged(event: any) {
    this.pagination.currentPage = event.page;
    this.noteService.setParams(this.pagination);
    this.loadNotes();
  }
}
