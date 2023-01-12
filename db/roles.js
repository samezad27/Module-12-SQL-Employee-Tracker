const db = require("./connection");
const inquirer = require("inquirer");
const { viewAllDepartments } = require("./departments");

async function viewAllRoles() {
  try {
    const roles = await db.query(
      "SELECT name as 'department', title, salary, r.id, department_id FROM department d join role r on r.department_id = d.id"
    );

    return roles;
  } catch (err) {
    console.log(err);
  }
}

async function addRole() {
  try {
    const departments = await viewAllDepartments();
    const { title, salary, department_id } = await inquirer.prompt([
      {
        type: "input",
        name: "title",
        message: "What role would you like to add?",
      },
      {
        type: "input",
        name: "salary",
        message: "What is their salary?",
      },
      {
        type: "list",
        name: "department_id",
        message: "What department does this role belong to?",
        choices: departments.map((department) => {
          return {
            value: department.id,
            name: department.name,
          };
        }),
      },
    ]);
    await db.query(
      `INSERT into role (title, salary, department_id) VALUES ("${title}", "${salary}", "${department_id}")`
    );
    const newRole = await viewAllRoles();
    return newRole;
  } catch (err) {
    console.log(err);
  }
}

async function removeRole() {
  try {
    const roleList = await viewAllRoles();
    const { id } = await inquirer.prompt([
      {
        type: "list",
        message: "Which role is being removed from the list?",
        name: "id",
        choices: roleList.map((role) => {
          return {
            name: role.title,
            value: role.id,
          };
        }),
      },
    ]);
    await db.query(`DELETE FROM role WHERE id = ${id}`);
    return await viewAllRoles();
  } catch (err) {
    console.log(err);
  }
}

module.exports = { viewAllRoles, addRole, removeRole };
