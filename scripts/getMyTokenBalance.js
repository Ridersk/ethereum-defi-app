/*
  Script Truffle para interagir com o smart contract
*/

const MyToken = artifacts.require("MyToken");
const FarmToken = artifacts.require("FarmToken");

module.exports = async function (callback) {
  const myToken = await MyToken.deployed();
  const farmToken = await FarmToken.deployed();
  const accounts = await new web3.eth.getAccounts();

  const balanceMyTokenInUser = await myToken.balanceOf(accounts[0]);
  const balanceMyTokenInSmartContract = await myToken.balanceOf(
    farmToken.address
  );

  console.log(
    "Saldo MyToken no Usuario: " +
      web3.utils.fromWei(balanceMyTokenInUser.toString())
  );
  console.log(
    "Saldo MyToken no Smart Contract: " +
      web3.utils.fromWei(balanceMyTokenInSmartContract.toString())
  );
  callback();
};
