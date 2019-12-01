import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SearchService } from '../search.service';
import { ConfigDialogComponent } from '../config-dialog/config-dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isLoading: BehaviorSubject<boolean> = new BehaviorSubject(false);
  query: string = '';

  constructor(private searchService: SearchService, private dialog: MatDialog) {
    this.searchService.isLoading.subscribe(this.isLoading);
  }

  ngOnInit() {
  }

  async submit($event: Event) {
    $event.preventDefault();
    this.searchService.search(this.query);
  }

  settings($event: Event) {
    this.dialog.open(ConfigDialogComponent);
  }

}
