import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatToolbarModule,
    RouterModule
  ],
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  employees: Employee[] = [];
  displayedColumns: string[] = ['name', 'email', 'department', 'actions'];

  constructor(private service: EmployeeService,
              private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees() {
    this.service.getEmployees().subscribe(data => {
      this.employees = data;
    });
  }

  deleteEmployee(id: number) {
    this.service.deleteEmployee(id).subscribe(() => {
      this.snackBar.open('Employee deleted', 'Close', { duration: 2000 });
      this.loadEmployees();
    });
  }
}