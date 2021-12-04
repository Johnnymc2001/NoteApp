import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Note } from 'src/app/_models/note';
import { NoteService } from 'src/app/_services/note.service';

@Component({
  selector: 'app-note-create',
  templateUrl: './note-create.component.html',
  styleUrls: ['./note-create.component.css']
})
export class NoteCreateComponent implements OnInit {
  noteForm: FormGroup;

  constructor(private fb: FormBuilder, private noteService: NoteService, private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.noteForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      tags: [''],
      visibility: ['Private']
    })
  }

  createNote() {
    let note = {publicAccess: this.noteForm.value["visibility"] == "Public"} as Note;
    Object.assign(note, this.noteForm.value);

    this.noteService.createNote(note).subscribe(resp => {
      this.router.navigateByUrl("/");
    });
  }
}
