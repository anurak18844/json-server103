import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormControl, FormGroup } from '@angular/forms';
import { first } from 'rxjs';
import { EmployeeModel } from './employee-dashboard.models';
import { ApiService } from '../shared/api.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css'],
})
export class EmployeeDashboardComponent implements OnInit {
  formEmployee!: FormGroup;
  employeeModel: EmployeeModel = new EmployeeModel()
  employeeData!: any
  showUpdate!: boolean;
  showAdd!:boolean;
  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.formEmployee = new FormGroup({
      firstName: new FormControl(),
      lastName: new FormControl(),
      email: new FormControl(),
      telephone: new FormControl(),
      salary: new FormControl()
    }),
    this.getAllEmloyee()
  }

  postEmployee(){
    this.employeeModel.firstName = this.formEmployee.value.firstName;
    this.employeeModel.lastName = this.formEmployee.value.lastName;
    this.employeeModel.email = this.formEmployee.value.email;
    this.employeeModel.telephone = this.formEmployee.value.telephone;
    this.employeeModel.salary = this.formEmployee.value.salary;
    this.api.postEmployee(this.employeeModel)
    .subscribe(res=>{
      // Post Success
      Swal.fire("Add Employee!","This is Success!","success")
      this.getAllEmloyee()
      let close = document.getElementById('close')
      close?.click()
    },
    _err=>{
       // Post Fail
       Swal.fire("Fail Employee!","This is Fail!","error")
    }
    )
  }

  getAllEmloyee(){
    this.api.getEmployee()
    .subscribe(res=>{
      this.employeeData = res;
    })
  }

  deleteEmployee(id:number){
    this.api.deletemployee(id)
    .subscribe(res=>{
      alert("delete success")
      this.getAllEmloyee()
    })
  }

  resetForm(){
    this.formEmployee.reset();
  }

  clickAdd(){
    this.formEmployee.reset();
    this.showAdd = true;
    this.showUpdate = false;
    this.employeeModel.id = 0;
  }

  onEdit(data: any){
    this.showAdd = false;
    this.showUpdate = true;

    this.employeeModel.id = data.id;
    this.formEmployee.controls['firstName'].setValue(data.firstName);
    this.formEmployee.controls['lastName'].setValue(data.lastName);
    this.formEmployee.controls['email'].setValue(data.email);
    this.formEmployee.controls['telephone'].setValue(data.telephone);
    this.formEmployee.controls['salary'].setValue(data.salary);

  }

  upDateEmployee(){
    this.employeeModel.firstName = this.formEmployee.value.firstName;
    this.employeeModel.lastName = this.formEmployee.value.lastName;
    this.employeeModel.email = this.formEmployee.value.email;
    this.employeeModel.telephone = this.formEmployee.value.telephone;
    this.employeeModel.salary = this.formEmployee.value.salary;
    this.api.updateEmployee(this.employeeModel.id,this.employeeModel)
    .subscribe(res=>{
      alert('update success')
      this.getAllEmloyee()
      let close = document.getElementById('close')
      close?.click()
    })
  }
}
