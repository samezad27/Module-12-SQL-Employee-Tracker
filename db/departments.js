const db = require("./connection");
const inquirer = require("inquirer");

async function viewAllDepartments() {
  try {
    const departments = await db.query("SELECT * FROM department");

    return departments;
  } catch (err) {
    console.log(err);
  }
}

//DONE

async function addDepartment(name) {
  try {
    const dpt = await db.query("INSERT into department(name) VALUES (?)", [
      name,
    ]);

    const departments = await viewAllDepartments();
    return departments;
  } catch (err) {
    console.error(err);
  }
}

async function removeDepartment() {
  try {
    const viewEveryDepartment = await viewAllDepartments();
    const { id } = await inquirer.prompt([
      {
        type: "list",
        message: `Which of these departments have been removed?`,
        name: "id",
        choices: viewEveryDepartment.map((department) => {
          return {
            name: department.name,
            value: department.id,
          };
        }),
      },
    ]);
    await db.query(`DELETE FROM department WHERE id = ${id}`);
    return await viewAllDepartments();
  } catch (err) {
    console.log(err);
  }
}

//need to remove departments

async function removeDepartment() {
  try {
    const viewDepartments = await viewAllDepartments();
    const { id } = await inquirer.prompt([
      {
        type: "list",
        message: `What department has been removed?`,
        name: "id",
        choices: viewDepartments.map((department) => {
          return {
            name: department.name,
            value: department.id,
          };
        }),
      },
    ]);
    await db.query(`DELETE FROM department WHERE id = ${id}`);
    return await viewAllDepartments();
  } catch (err) {
    console.log(err);
  }
}

//export functions:

module.exports = { viewAllDepartments, addDepartment, removeDepartment };
