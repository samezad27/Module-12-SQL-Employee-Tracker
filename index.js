const { prompt, default: inquirer } = require("inquirer");
const db = require("./db/connection");
const {
  viewAllDepartments,
  addDepartment,
  removeDepartment,
} = require("./db/departments");
const {
  viewAllEmployees,
  addEmployee,
  removeEmployee,
  updateEmployee,
} = require("./db/employees");
const { viewAllRoles, addRole, removeRole } = require("./db/roles");

const start = async () => {
  console.log("Welcome to the Employee Manager!");
  const { choice } = await prompt([
    {
      type: "list",
      name: "choice",
      message: "What would you like to do?",
      choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Add a department",
        "Add a role",
        "Add an employee",
        "Remove a department",
        "Remove a role",
        "Remove an employee",
        "Update an employee",
        "Exit",
      ],
    },
  ]);

  let results;
  switch (choice) {
    case "View all departments":
      results = await viewAllDepartments();
      console.table(results[0]);
      break;
    case "View all employees":
      results = await viewAllEmployees();
      console.table(results[0]);
      break;
    case "View all roles":
      results = await viewAllRoles();
      console.table(results[0]);
      break;

    // add a department works
    case "Add a department":
      const { name } = await prompt([
        {
          type: "input",
          name: "name",
          message: "What department do you want to add?",
        },
      ]);
      results = await addDepartment(name);
      console.table(results[0]);
      break;
    //add a role does not work -- look into inquirer

    case "Add a role":
      async function addRole() {
        try {
          const department = await viewAllDepartments();
          const { title, salary, department_id } = await inquirer.prompt([
            {
              type: "input",
              role: "title",
              message: "What role do you want to add?",
            },
            {
              type: "input",
              salary: "salary",
              message: "What is the salary?",
            },
            {
              type: "list",
              name: "department_id",
              message: "Select the department",
              choices: department.map((dpt) => {
                return {
                  value: dpt.id,
                  name: dpt.name,
                };
              }),
            },
          ]);
          await db.query(
            `INSERT into role (title, salary, department_id) VALUES ("${title}", "${salary}", "${department_id}")`
          );
          const newRole = await viewRoles();
          return newRole;
        } catch (err) {
          console.log(err);
        }
      }

    // add an employee has not started
    /*
    case "Add an employee":
      results = await addEmployee();
      console.table(results[0]);
      break;
    case "Remove an employee":
      results = await removeEmployee();
      console.table(results[0]);
      break;
    case "Remove a role":
      results = await removeRole();
      console.table(results[0]);
      break;
    case "Remove a department":
      results = await removeDepartment();
      console.table(results[0]);
      break;
    case "Update an employee":
      results = await updateEmployee();
      console.table(results[0]);
      break;  */
    case "Exit":
      process.exit();
  }
  start(true);
};

start(false);
