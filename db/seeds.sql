-- some default values
INSERT INTO department(name)
VALUES ("Engineering"),
        ("Finance"),
        ("Legal"),
        ("Sales");

Insert into role(title,salary,department_id)
Values ("Sales Lead",100000,4 ),
        ("SalesPerson", 80000,4),
        ("Lead Engineer", 150000,1),
        ("Sofware Engineer", 120000,1);

Insert into employee(first_name,last_name,role_id,manager_id)
Values ("David","Yu",1,NULL),
        ("Michael","clorene",2,1);

