import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { Users } from '../../models/users.model';
import { BehaviorSubject } from 'rxjs';
import { Column } from '@app/datacapture/pages/admin/models/column';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  users$: BehaviorSubject<Users[]> = new BehaviorSubject([]);
  loading: boolean;
  searchTerm: string;
  columns = [
    new Column('', 'action'),
    new Column('First Name', 'first_name'),
    new Column('Last Name', 'last_name'),
    // new Column('Name', 'name'),
    new Column('Email', 'email'),
    new Column('Created On', 'created_on'),
    new Column('Modified On', 'modified_on')
  ];
  constructor(private service: UsersService) { }

  ngOnInit() {
    this.loading = true;
    this.service.getUsers().subscribe((res: any) => {
      if (res) {
        this.users$.next(res.data);
        this.loading = false;
      }
    });
  }

}
