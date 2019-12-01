import { Component, OnInit } from '@angular/core';
import { SearchService, SearchResponse } from '../search.service';
import { BehaviorSubject } from 'rxjs';
import { MatDialog } from '@angular/material';
import { ConfigDialogComponent } from '../config-dialog/config-dialog.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  isLoading: BehaviorSubject<boolean> = new BehaviorSubject(false);
  response: BehaviorSubject<SearchResponse> = new BehaviorSubject(undefined);
  query: string = '';

  constructor(private searchService: SearchService, private dialog: MatDialog) {
    searchService.query.subscribe(query => {
      this.query = query;
    });
    this.searchService.isLoading.subscribe(this.isLoading);
    this.searchService.response.subscribe(this.response);
  }

  ngOnInit() {
  }

  async submit($event: Event) {
    $event.preventDefault();
    if(this.query == '') this.searchService.response.next(undefined);
    this.searchService.search(this.query);
  }

  settings($event: Event) {
    this.dialog.open(ConfigDialogComponent);
  }

  changeQurery($event: Event){
    $event.preventDefault();
    this.searchService.search(this.response.value.correction.query);
  }

  changeForced($event: Event){
    $event.preventDefault();
    this.searchService.resendWithForce(true);
  }

}
