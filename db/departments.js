const db = require("./connection");

async function viewAllDepartments() {
  try {
    const departments = await db.promise().query("SELECT * FROM department");

    return departments;
  } catch (err) {
    console.log(err);
  }
}

module.exports = { viewAllDepartments };

//need to add departments

/*async function addDepartment() {
    try{
        const
    }

}
*/
//need to remove departments

//export functions:

//module.exports = { viewAllDepartments, addDepartment };
