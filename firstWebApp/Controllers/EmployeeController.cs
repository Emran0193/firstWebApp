using System.Web.Mvc;
using firstWebApp.Models.Employee;

namespace firstWebApp.Controllers
{
    public class EmployeeController : Controller
    {
        EmployeeDB empDB = new EmployeeDB();
        // GET: Home  
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult List()
        {
            return Json(empDB.ListAll(), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Add(Employee emp)
        {
            return Json(empDB.Add(emp), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetbyID(string ID)
        {
            var Employee = empDB.ListAll().Find(x => x.EmpId.Equals(ID));
            //Employee.JoiningDate = Employee.JoiningDate.ToString("yyyyMMdd");
            return Json(Employee, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Update(Employee emp)
        {
            return Json(empDB.Update(emp), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete(int ID)
        {
            return Json(empDB.Delete(ID), JsonRequestBehavior.AllowGet);
        }
        public ActionResult EmployeeDetails()
        {
            return View();
        }
    }
}