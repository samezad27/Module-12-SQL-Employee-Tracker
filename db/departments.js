const db = require("./connection");

async function viewAllDepartments() {
  try {
    const departments = await db.promise().query("SELECT * FROM department");
    console.log(departments);
    return departments;
  } catch (err) {
    console.log(err);
  }
}

//need to add departments

async function addDepartment(name) {
  try {
    const dpt = await db
      .promise()
      .query("INSERT into department(name) VALUES (?)", [name]);

    const departments = await viewAllDepartments();
    return departments;
  } catch (err) {
    console.error(err);
  }
}

/*async function addDepartment() {
    try{
        const
    }

}
*/
//need to remove departments

//export functions:

module.exports = { viewAllDepartments, addDepartment };
