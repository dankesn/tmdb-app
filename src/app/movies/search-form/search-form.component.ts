import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms'; 
import { Router } from '@angular/router';


@Component({
  selector: 'tmdb-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnInit {
	@Output() onSearch :EventEmitter<string>;
	searchForm: FormGroup;

  constructor(private fb: FormBuilder, private route: Router) { 
  this.onSearch = new EventEmitter();

		this.searchForm = this.fb.group({
			'searchText': ''
		}); 
	}

  ngOnInit() {}

  search() :void{
  		this.onSearch.emit(this.searchForm.value.searchText);
  		this.route.navigate(['movies/search']);
  	}

}
