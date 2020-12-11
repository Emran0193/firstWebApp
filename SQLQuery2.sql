--Select Employees  
Create Procedure SelectEmployee    
as     
Begin    
Select * from Employee;    
End  
  
--Insert and Update Employee  
CREATE Procedure InsertUpdateEmployee   
(        
@EmpID nvarchar(50),--='EMP003',        
@EmpName nvarchar(50),--='Akash',        
@EmpSalary money,-- = 240000,        
@TDS money,--=2400,        
@NetSalary money,--=237600,    
@JoiningDate datetime,--='11/08/2020',        
@Action varchar(10)--='Update'       
)        
As        
Begin    
DECLARE @employeecount INT    
DECLARE @id nvarchar(50)    
DECLARE @tempid INT    
declare @rpassword binary(8)    
set @rpassword = CRYPT_GEN_RANDOM(8)      
if (@Action='Insert' )  
Begin      
SELECT @employeecount= COUNT(*) FROM Employee WHERE EmpId LIKE'EMP%'    
IF @employeecount=0    
  SELECT @id='EMP001';    
ELSE    
 BEGIN    
   SELECT @tempid =MAX(CAST(REPLACE(EmpId,'EMP','')AS INT )+1 ) FROM Employee;    
   IF LEN(@tempid)=1    
    SELECT @id='EMP00'+CAST(@tempid AS VARCHAR(10));    
   IF LEN(@tempid)=2    
    SELECT @id='EMP0'+CAST(@tempid AS VARCHAR(10));    
     IF LEN(@tempid)>2    
   SELECT @id='EMP'+CAST(@tempid AS VARCHAR(10));    
 END      
 Insert into Employee(EmpId, EmpName, [Password], EmpSalary, TDS, NetSalary, JoiningDate) values(@id, @EmpName,@rpassword , @EmpSalary, @TDS, @NetSalary, CAST(@JoiningDate AS datetime));        
End        
if (@Action='Update')        
Begin        
 Update Employee set EmpName=@EmpName,EmpSalary=@EmpSalary,TDS=@TDS,NetSalary=@NetSalary, JoiningDate=CAST(@JoiningDate AS datetime) where EmpID=@EmpId;        
End          
End 
  
--Delete Employee  
create Procedure DeleteEmployee    
(    
 @Id nvarchar(50)    
)    
as     
Begin    
 Delete Employee where EmpID=@Id;    
End  