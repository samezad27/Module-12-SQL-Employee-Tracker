const db = require("./connection");

async function viewAllEmployees() {
  try {
    const employees = await db.promise().query("SELECT * FROM employee");

    return employees;
  } catch (err) {
    console.log(err);
  }
}

module.exports = { viewAllEmployees };
