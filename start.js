const util = require("util");
const exec = util.promisify(require("child_process").exec);

async function deploy() {
    const { stdout: output6 } = await exec("yarn clean");
  console.log("Dropping node modules...");
  console.log(output6);


  const { stdout: output1 } = await exec("yarn install");
  console.log("Installing dependencies...");
  console.log(output1);

  const { stdout: output4 } = await exec("yarn db:drop");
  console.log("Dropping database...");
  console.log(output4);

  const { stdout: output5 } = await exec("yarn db:create");
  console.log("Creating database...");
  console.log(output5);

  const { stdout: output2 } = await exec("yarn db:migrate");
  console.log("Migrating database...");
  console.log(output2);

  const { stdout: output3 } = await exec("yarn db:seed");
  console.log("Seeding database...");
  console.log(output3);
}

deploy();