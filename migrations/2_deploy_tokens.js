const MyToken = artifacts.require("MyToken");

module.exports = async function (deployer, network, accounts) {
  // Deploy MyToken
  await deployer.deploy(MyToken);
  await MyToken.deployed();
  // const myToken = await MyToken.deployed()
};
