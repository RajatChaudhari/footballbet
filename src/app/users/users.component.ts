import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { MatTableDataSource } from '@angular/material';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[];

  constructor(private userService: UserService) { }
  displayedColumns = ['ID', 'Name'];
  dataSource = new MatTableDataSource(this.users);
  ngOnInit() {
    this.getUsers();
  }
  getUsers(): void {
    this.userService.getUsers()
      .subscribe(users => {
        this.users = users;
        this.dataSource = new MatTableDataSource(this.users);
      });
  }
  add(Name: string): void {
    Name = Name.trim();
    if (!Name) { return; }
    this.userService.addUser({ Name } as User)
      .subscribe(user => {
        this.users.push(user);
      });
  }
}