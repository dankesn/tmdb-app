import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'tmdb-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  @Input() totalItems: number;
  @Input() totalPages: number;
  @Output() pageChange = new EventEmitter();

  currentPage: number = 1;
  
  constructor() { }

  ngOnInit() { 
  }

  ngOnChanges() {
    this.currentPage = 1;
  }

  changePage(page) {
    this.currentPage = page;
    this.pageChange.emit({"page": this.currentPage});
  }

}

}
