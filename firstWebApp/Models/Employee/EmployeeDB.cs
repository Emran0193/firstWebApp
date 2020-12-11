using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;

namespace firstWebApp.Models.Employee
{
    public class EmployeeDB
    {
        //declare connection string  
        string cs = ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString;

        //Return list of all Employees  
        public List<Employee> ListAll()
        {
            List<Employee> lst = new List<Employee>();
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("SelectEmployee", con);
                com.CommandType = CommandType.StoredProcedure;
                SqlDataReader rdr = com.ExecuteReader();
                while (rdr.Read())
                {
                    lst.Add(new Employee
                    {
                        EmpId = rdr["EmpId"].ToString(),
                        EmpName = rdr["EmpName"].ToString(),
                        Password = rdr["Password"].ToString(),
                        EmpSalary = Convert.ToDouble(rdr["EmpSalary"]),
                        TDS = Convert.ToDouble(rdr["TDS"]),
                        NetSalary = Convert.ToDouble(rdr["NetSalary"]),
                        JoiningDate = String.Format("{0:d/M/yyyy}", rdr["JoiningDate"])
                    });
                }
                return lst;
            }
        }

        //Method for Adding an Employee  
        public int Add(Employee emp)
        {
            int i;
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("InsertUpdateEmployee", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@EmpId", "");
                com.Parameters.AddWithValue("@EmpName", emp.EmpName);
                com.Parameters.AddWithValue("@EmpSalary", emp.EmpSalary);
                com.Parameters.AddWithValue("@TDS", emp.TDS);
                com.Parameters.AddWithValue("@NetSalary", emp.NetSalary);
                com.Parameters.AddWithValue("@JoiningDate", emp.JoiningDate);
                com.Parameters.AddWithValue("@Action", "Insert");
                i = com.ExecuteNonQuery();
            }
            return i;
        }

        //Method for Updating Employee record  
        public int Update(Employee emp)
        {
            int i;
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("InsertUpdateEmployee", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@EmpId", emp.EmpId);
                com.Parameters.AddWithValue("@EmpName", emp.EmpName);
                com.Parameters.AddWithValue("@EmpSalary", emp.EmpSalary);
                com.Parameters.AddWithValue("@TDS", emp.TDS);
                com.Parameters.AddWithValue("@NetSalary", emp.NetSalary);
                com.Parameters.AddWithValue("@JoiningDate", emp.JoiningDate);
                com.Parameters.AddWithValue("@Action", "Update");
                i = com.ExecuteNonQuery();
            }
            return i;
        }

        //Method for Deleting an Employee  
        public int Delete(int ID)
        {
            int i;
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("DeleteEmployee", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@Id", ID);
                i = com.ExecuteNonQuery();
            }
            return i;
        }
    }
}