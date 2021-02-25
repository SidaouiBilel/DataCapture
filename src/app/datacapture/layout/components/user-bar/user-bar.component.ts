import { Component, OnInit } from '@angular/core';
import { LoginService } from '@app/core/login/service/login.service';
import { UsersService } from '@app/datacapture/pages/users/services/users.service';
import { Store } from '@ngrx/store';
import { selectToken, ActionAuthLogout , selectProfile} from '@app/core';
import { switchMap, map, take } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';

@Component({
  selector: 'app-user-bar',
  templateUrl: './user-bar.component.html',
  styleUrls: ['./user-bar.component.css']
})
export class UserBarComponent implements OnInit {

  constructor(private user: LoginService, private store: Store<any>) { }

  user$: Observable<any>;
  avatar$;
  ngOnInit() {
    this.user$ = this.store.select(selectProfile);

    this.avatar$ =  this.user$.pipe(map((user: any) => {
      if (user) {
        return String((user.first_name || ' ')[0] + (user.last_name || ' ')[0]).toUpperCase();
      } else { return null; }
    }));
  }

  logout(): void {
    this.user.logout().subscribe();
  }

}
