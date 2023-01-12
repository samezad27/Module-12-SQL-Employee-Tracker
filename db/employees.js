const db = require("./connection");
const inquirer = require("inquirer");
const { viewAllRoles } = require("./roles");

//works
async function viewAllEmployees() {
  try {
    const employees = await db.query("SELECT * FROM employee");

    return employees;
  } catch (err) {
    console.log(err);
  }
}
//not working-- need to fix
async function addEmployee() {
  try {
    const roles = await viewAllRoles();

    const employees = await viewAllEmployees();
    const { firstName, lastName, role_id, manager } = await inquirer.prompt([
      {
        type: "input",
        name: "firstName",
        message: "What is their first name?",
      },
      {
        type: "input",
        name: "lastName",
        message: "What is their last name?",
      },
      {
        type: "list",
        name: "role_id",
        message: "What is their role?",
        choices: roles.map((role) => {
          return {
            value: role.id,
            name: role.title,
          };
        }),
      },
      {
        type: "list",
        name: "manager",
        message: "Who is the employee's manager?",
        choices: [
          ...employees.map((e) => {
            return {
              value: e.id,
              name: `${e.first_name} ${e.last_name}`,
            };
          }),
          {
            value: null,
            name: "No manager",
          },
        ],
      },
    ]);
    await db.query(
      `INSERT into employee (first_name, last_name, role_id, manager_id) VALUES  (?, ?, ?, ?) `,
      [firstName, lastName, role_id, manager]
    );
    const newEmployees = await viewAllEmployees();
    return newEmployees;
  } catch (err) {
    console.log(err);
  }
}
//need to fix
async function updateEmployee() {
  try {
    const currentEmployees = await viewAllEmployees();
    const employeeRoles = await viewAllRoles();

    const { employee, newRole } = await inquirer.prompt([
      {
        type: "list",
        name: "employee",
        messsage: "What employee would you like to update?",
        choices: currentEmployees.map((e) => {
          return {
            name: `${e.first_name}, ${e.last_name}`,
            value: e.id,
          };
        }),
      },
      {
        type: "list",
        name: "newRole",
        message: `Select the new role`,
        choices: employeeRoles.map((role) => {
          return {
            name: role.title,
            value: role.id,
          };
        }),
      },
    ]);

    await db.query(
      `UPDATE employee SET role_id = ${newRole} WHERE id = ${employee}`
    );
    const updatedEmployee = await viewAllEmployees();
    return await updatedEmployee;
  } catch (err) {
    console.log(err);
  }
}

async function removeEmployee() {
  try {
    const employees = await viewAllEmployees();
    const { id } = await inquirer.prompt([
      {
        type: "list",
        message: "What employee would you liek to remove?",
        name: "id",
        choices: employees.map((employee) => {
          return {
            name: `${employee.first_name}, ${employee.last_name}`,
            value: employee.id,
          };
        }),
      },
    ]);
    await db.query(`DELETE FROM employee WHERE id =${id}`);
    return await viewAllEmployees();
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  viewAllEmployees,
  addEmployee,
  updateEmployee,
  removeEmployee,
};
