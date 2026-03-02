import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private employees: Employee[] = [];
  private employeesSubject = new BehaviorSubject<Employee[]>([]);
  private idCounter = 1;

  constructor() {}

  addEmployee(employee: Omit<Employee, 'id'>): void {
    const newEmployee: Employee = {
      id: this.idCounter++,
      ...employee
    };

    this.employees.push(newEmployee);
    this.employeesSubject.next(this.employees);
  }

  getEmployees(): Observable<Employee[]> {
    return this.employeesSubject.asObservable();
  }

  deleteEmployee(id: number): void {
    this.employees = this.employees.filter(emp => emp.id !== id);
    this.employeesSubject.next(this.employees);
  }
}