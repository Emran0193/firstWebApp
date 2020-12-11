using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace firstWebApp.Models.Employee
{
    public class Employee
    {
        public string EmpId { get; set; }

        public string EmpName { get; set; }
        public string Password { get; set; }

        public double EmpSalary { get; set; }

        public double TDS { get; set; }

        public double NetSalary { get; set; }
        public string JoiningDate { get; set; }
    }
}