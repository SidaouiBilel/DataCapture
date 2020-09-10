import { Component } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd';
import { NotificationService } from '@app/core';
import { AddUserComponent } from '../components/add-user/add-user.component';
import { Users } from './../models/users.model';
import { FormGroup } from '@angular/forms';
import { UsersService } from '../services/users.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  searchUser = '';
  reload$: BehaviorSubject<any> = new BehaviorSubject<any>(false);
  constructor(private modalService: NzModalService,
              private service: UsersService,
              private notification: NotificationService) {}

  addUser(msg: string, edit: boolean, user?: Users): void {
    const modal: NzModalRef = this.modalService.create({
      nzTitle: 'Add User',
      nzClosable: false,
      nzWrapClassName: 'vertical-center-modal',
      nzWidth: 'xXL',
      nzContent: AddUserComponent,
      nzOkText: 'Add',
      nzComponentParams: {
        user
      },
      nzOnOk: componentInstance => {
        try {
          modal.getInstance().nzOkLoading = true;
          componentInstance.submitForm();
          if (componentInstance.validateForm.valid) {
            this.onAddUser(componentInstance.validateForm, edit).subscribe((res) => {
              this.notification.success(msg);
              modal.getInstance().nzOkLoading = false;
              this.reload$.next(true);
              modal.close();
            });
          }
        } catch (error) {
          this.notification.error(error);
        }
      }
    });
  }

  onAddUser(form: FormGroup, edit: boolean) {
    const user: Users = {
      first_name: form.controls.firstName.value,
      last_name: form.controls.lastName.value,
      email: form.controls.email.value,
      password: form.controls.password ? form.controls.password.value : null,
      created_on: null,
      modified_on: null,
      id: form.controls.id.value
    };
    console.log(user);
    if (edit) {
      return this.service.editUser(user);
    } else {
      return this.service.addUser(user);
    }
  }

  reload(): void {
    this.reload$.next(true);
  }

  editUser(user: Users): void {
    this.addUser('The user was updated successfully.',true, user);
  }
}
