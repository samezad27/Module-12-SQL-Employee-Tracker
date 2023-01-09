const db = require("./connection");

async function viewAllRoles() {
  try {
    const roles = await db
      .promise()
      .query(
        "SELECT * FROM department d join role r on r.department_id = d.id"
      );

    return roles;
  } catch (err) {
    console.log(err);
  }
}

module.exports = { viewAllRoles };
