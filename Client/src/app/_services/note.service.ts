import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Note } from '../_models/note';
import { Pagination } from '../_models/pagination';
import { getPaginatedResult, getPaginationHeaders } from './paginationResult';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  baseUrl = environment.apiUrl;
  private currentNoteSource = new BehaviorSubject<Note[]>([]);
  currentNotes$ = this.currentNoteSource.asObservable();

  pageParams: Pagination;


  constructor(private http: HttpClient) {
    this.pageParams = new Pagination();
    this.pageParams.currentPage = 1;
    this.pageParams.itemsPerPage = 5;
  }

  getParams() {
    return this.pageParams;
  }

  setParams(pageParams: Pagination) {
    this.pageParams = pageParams;
  }

  getNotes(pageParams: Pagination) {
    let params = getPaginationHeaders(pageParams.currentPage, pageParams.itemsPerPage);

    return getPaginatedResult<Note[]>(this.baseUrl + 'note', params, this.http)
      .pipe(map(response => {
        this.currentNoteSource.next(response.result);
        return response;
      }))
  }

  createNote(note: Note) {
    return this.http.post(this.baseUrl + "note", note).pipe(
      map((resp) => {
        this.currentNoteSource.next([...this.currentNoteSource.value, note]);
      })
    )
  }

  resetNote() {
    this.currentNoteSource.next([]);
  }
}
