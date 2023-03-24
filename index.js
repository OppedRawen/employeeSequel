
const mysql = require('mysql2');
const inquirer = require('inquirer');


const db = mysql.createConnection(
    {
        host: 'localhost',
    // MySQL Username
    user: 'root',
    // TODO: Add MySQL Password
    password: 'Wodeshijie123@',
    database: 'work_db'
    },
    console.log("Connected")
);
const input = [
    {
        type: "list",
        name: "todo",
        message: "What would you like to do?",
        choices: ["View All Employees","View All Roles","Add Employee","Update Employee Role", "Add Role","View All Departments","Add Department","quit"]
    },
    
];
const role = ()=>{
    db.query(`Select title from role`);
   
}
const DepartmentQuery = () =>{
    db.query("SELECT id,name FROM department",(err,result)=>{
        console.table(result);
       
        generateInput();
        return;
    });
}
const roleQuery = ()=>{
    db.query("SELECT role.title, department.name AS department, role.salary FROM role INNER JOIN department ON role.department_id = department.id",(err,result)=>{
        console.table(result);
        generateInput();
        return;
    });
}
const employeeQuery =  ()=>{
     db.query("SELECT employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, employee.manager_id FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id",(err,result)=>{
        console.table(result);
      
        generateInput();
        return
    });
}
const addEmployee = ()=>{
    inquirer.prompt(
        [
            {
                type: "input",
                name: "firstName",
                message: "What is the first name of the employee?",
            },
            {
                type: "input",
                name: "lastName",
                message: "What is the last name of the employee?",
            },
            {
                type: "input",
                name: "roleId",
                message: "What is the role id of the employee??",
            },
            {
                type: "input",
                name: "managerID",
                message: "What is the manager id of the employee?(enter null if not manager)",
            },
            
        ]
    ).then((response)=>{
       console.table(response);
        db.query(`INSERT INTO employee(first_name, last_name, role_id,manager_id) VALUES ("${response.firstName}","${response.lastName}",${response.roleId},${response.managerID})`,(err,result)=>{
            if(err){
                console.error(err);
            }
            console.table(result);
            console.log("Role added");
            generateInput();
        });
      

    })
}
const addRole = () =>{
    inquirer.prompt(
        [
            {
                type: "input",
                name: "roleName",
                message: "What is the name of the role?",
            },
            {
                type: "input",
                name: "salary",
                message: "What is the salary of the role?",
            },
            {
                type: "list",
                name: "department",
                message: "Which department does it belongs to?",
                choices: ["Engineering","Finance","Legal","Sales","Service"]
            },
        ]
    ).then((response)=>{
       if(response.department==="Engineering"){
        db.query(`INSERT INTO role(title, salary, department_id) VALUES ("${response.roleName}",${response.salary},1)`,(err,result)=>{
            if(err){
                console.error(err);
            }
            console.table(result);
            console.log("Role added");
            generateInput();
        });
       }else if(response.department==="Finance"){
        db.query(`INSERT INTO role(title, salary, department_id) VALUES ("${response.roleName}",${response.salary},2)`,(err,result)=>{
            if(err){
                console.error(err);
            }
            console.table(result);
            console.log("Role added");
            generateInput();
        });
       }else if(response.department==="Legal"){
        db.query(`INSERT INTO role(title, salary, department_id) VALUES ("${response.roleName}",${response.salary},3)`,(err,result)=>{
            if(err){
                console.error(err);
            }
            console.table(result);
            console.log("Role added");
            generateInput();
        });
       }else if(response.department==="Sales"){
        db.query(`INSERT INTO role(title, salary, department_id) VALUES ("${response.roleName}",${response.salary},4)`,(err,result)=>{
            if(err){
                console.error(err);
            }
            console.table(result);
            console.log("Role added");
            generateInput();
        });
       }else if(response.department==="Service"){
        db.query(`INSERT INTO role(title, salary, department_id) VALUES ("${response.roleName}",${response.salary},5)`,(err,result)=>{
            if(err){
                console.error(err);
            }
            console.table(result);
            console.log("Role added");
            generateInput();
        });
       }
       
      

    })
}
const addDepartment = ()=>{
    inquirer.prompt(
        [
            {
                type: "input",
                name: "departmentName",
                message: "Add a name to the department",
            },
            
        ]
    ).then((response)=>{
        db.query(`INSERT INTO department(name) VALUES (?)`, response.departmentName,(err,result)=>{
            if(err){
                console.error(err);
            }
            console.table(result);
            console.log("Department added");
            generateInput();
        });

    })
}
// did not get to this
const upDateEmployeeeRole = ()=>{
    let choices = 0;
    inquirer.prompt(
        [
            {
                type: "list",
                name: "update",
                message: "Whic employee role would you like to update?",
                choices: choices
            },
            
        ]
    ).then((response)=>{
        db.query(`INSERT INTO department(name) VALUES (?)`, response.departmentName,(err,result)=>{
            if(err){
                console.error(err);
            }
            console.table(result);
            console.log("Department added");
            generateInput();
        });

    })
}
const generateInput = ()=>{
    inquirer.prompt(input).then((response)=>{
        if(response.todo!=="quit"){
            // some kind of while loop and if statements?
            if(response.todo==="View All Employees"){
                employeeQuery();
            }else if(response.todo==="View All Departments"){
                DepartmentQuery();
            }else if(response.todo==="View All Roles"){
                roleQuery();
            }else if(response.todo ==="Add Department"){
                addDepartment();
            }else if(response.todo ==="Add Role"){
                addRole();
            }else if(response.todo ==="Add Employee"){
                addEmployee();
            }
         
        }else{
            console.log("you quit");
        }
        
        return;
    })
};
function init(){
    generateInput();
}
init();
