import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Note } from 'src/app/_models/note';
import { NoteService } from 'src/app/_services/note.service';

@Component({
  selector: 'app-note-edit',
  templateUrl: './note-edit.component.html',
  styleUrls: ['./note-edit.component.css']
})
export class NoteEditComponent implements OnInit {
  note: Note;
  noteForm: FormGroup;

  constructor(private fb: FormBuilder, private noteService: NoteService, private router: Router, private route: ActivatedRoute) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    this.route.params.subscribe(param => {
      let id = +param.id;
      this.noteService.currentNotes$.subscribe(notes => {

        this.note = notes.find(note => note.id == id)
      })
    })

    this.initForm();
  }

  initForm() {
    this.noteForm = this.fb.group({
      title: [this.note.title, Validators.required],
      content: [this.note.content, Validators.required],
      tags: [this.note.tags]
    })
  }

  updateNote() {
    Object.assign(this.note, this.noteForm.value);
    this.noteService.updateNote(this.note).subscribe(resp => {
      this.router.navigateByUrl("/");
    });
  }
}
