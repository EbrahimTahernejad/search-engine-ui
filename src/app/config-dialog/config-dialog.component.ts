import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-config-dialog',
  templateUrl: './config-dialog.component.html',
  styleUrls: ['./config-dialog.component.scss']
})
export class ConfigDialogComponent implements OnInit {

  tf: string = ''
  idf: string = ''
  dis: string = ''
  ranker: string = ''

  constructor(private searchService: SearchService, public dialogRef: MatDialogRef<ConfigDialogComponent>) {
    this.tf = searchService.tf.value;
    this.idf = searchService.idf.value;
    this.dis = searchService.dis.value;
    this.ranker = searchService.ranker.value;
  }

  ngOnInit() {
  }

  cancel() {
    this.dialogRef.close();
  }

  save() {
    this.searchService.tf.next(this.tf)
    this.searchService.idf.next(this.idf);
    this.searchService.dis.next(this.dis);
    this.searchService.ranker.next(this.ranker);
    this.dialogRef.close();
  }

}
