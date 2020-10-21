Create database Employee

use Employee

create table Employee
	(
	EmpID nvarchar(50) not null,
	EmpName nvarchar(50) not null,
	[Password] nvarchar(50) not null,
	EmpSalary money not null,
	TDS money not null,
	NetSalary money not null,
	JoiningDate datetime not null,
	constraint pk_Employee primary key(EmpID)
	)
	go

	drop table Employee