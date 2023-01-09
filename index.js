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

  console.log(choice);
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
    //add a role does not work

    case "Add a role":
      const newRole = await addRole();
      console.table(newRole);
      break;

    case "Add an employee":
      results = await addEmployee();
      console.table(results[0]);
      break;

    case "Remove an employee":
      results = await removeEmployee();
      console.table(results[0]);
      break;
    case "Remove a role":
      const removedRole = await removeRole();
      console.table(removedRole);
      break;
    case "Remove a department":
      const removedDepartment = await removeDepartment();
      console.table(removedDepartment);
      break;
    case "Update an Employee":
      const updatedEmployee = await updateEmployee();
      console.table(updatedEmployee);
      break;
    case "Exit":
      process.exit();
  }
  start(true);
};

start(false);
