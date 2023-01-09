const db = require("./connection");
const inquirer = require("inquirer");
const { viewAllRoles } = require("./roles");

//works
async function viewAllEmployees() {
  try {
    const employees = await db.promise().query("SELECT * FROM employee");

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
    const { firstName, lastName, role, manager } =
      await inquirer.createPromptModule([
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
          name: "role",
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
      `INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("${firstName}", "${lastName}", "${role}", "${manager}") `
    );
    const newEmployees = await AllEmployees();
    return newEmployees;
  } catch (err) {
    console.log(err);
  }
}
//need to fix
async function updateEmployee() {
  try {
    const currentEMployees = await viewAllEmployees();
    const employeeRoles = await viewAllRoles();
    const { employee, newRole } = await inquirer.createPromptModule([
      {
        type: "list",
        name: "employee",
        messsage: "What employee would you like to update?",
        choices: currentEMployees.map((e) => {
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
    const updatedEmployee = await viewEmployees();
    return await updatedEmployee;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  viewAllEmployees,
  addEmployee,
  updateEmployee,
};
