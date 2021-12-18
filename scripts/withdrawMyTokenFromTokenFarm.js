/*
  Script Truffle para interagir com o smart contract
*/

const MyToken = artifacts.require("MyToken");
const FarmToken = artifacts.require("FarmToken");

module.exports = async function (callback) {
  const accounts = await new web3.eth.getAccounts();
  const myToken = await MyToken.deployed();
  const farmToken = await FarmToken.deployed();

  // Verifica o saldo da conta do usuario accounts[0] e do Smart Contract antes e depois do withdraw
  const balanceMyTokenInUserBeforeWithdraw = await myToken.balanceOf(
    accounts[0]
  );
  const balanceMyTokenInSmartContractBeforeWithdraw = await myToken.balanceOf(
    farmToken.address
  );
  console.log("*** My Token ***");
  console.log(
    "Saldo de MyToken na conta do usuario 'accounts[0]' antes do withdraw " +
      web3.utils.fromWei(balanceMyTokenInUserBeforeWithdraw.toString())
  );
  console.log(
    "Saldo de MyToken na conta do smart contract antes do withdraw " +
      web3.utils.fromWei(balanceMyTokenInSmartContractBeforeWithdraw.toString())
  );

  console.log("*** Farm Token ***");
  const balanceFarmTokenInUserBeforeWithdraw = await farmToken.balanceOf(
    accounts[0]
  );
  const balanceFarmTokenInSmartContractBeforeWithdraw =
    await farmToken.balanceOf(farmToken.address);
  console.log(
    "Saldo de FarmToken na conta do usuario 'accounts[0]' antes do withdraw: " +
      web3.utils.fromWei(balanceFarmTokenInUserBeforeWithdraw.toString())
  );
  console.log(
    "Saldo de FarmToken na conta do smart contract FarmToken antes do withdraw: " +
      web3.utils.fromWei(
        balanceFarmTokenInSmartContractBeforeWithdraw.toString()
      )
  );

  // Chama funcao de Withdraw do FarmToken
  console.log("Chama funcao Withdraw");
  await farmToken.withdraw(web3.utils.toWei("100", "ether"));

  console.log("*** My Token ***");
  const balanceMyTokenInUserAfterWithdraw = await myToken.balanceOf(
    accounts[0]
  );
  const balanceMyTokenInSmartContractAfterWithdraw = await myToken.balanceOf(
    farmToken.address
  );
  console.log(
    "Saldo de MyToken na conta do usuario 'accounts[0]' depois do withdraw: " +
      web3.utils.fromWei(balanceMyTokenInUserAfterWithdraw.toString())
  );
  console.log(
    "Saldo de MyToken na conta do smart contract depois do withdraw: " +
      web3.utils.fromWei(balanceMyTokenInSmartContractAfterWithdraw.toString())
  );

  console.log("*** Farm Token ***");
  const balanceFarmTokenInUserAfterWithdraw = await farmToken.balanceOf(
    accounts[0]
  );
  const balanceFarmTokenInSmartContractAfterWithdraw =
    await farmToken.balanceOf(farmToken.address);
  console.log(
    "Saldo de FarmToken na conta do usuario 'accounts[0]' depois do withdraw: " +
      web3.utils.fromWei(balanceFarmTokenInUserAfterWithdraw.toString())
  );
  console.log(
    "Saldo de FarmToken na conta do smart contract depois do withdraw: " +
      web3.utils.fromWei(
        balanceFarmTokenInSmartContractAfterWithdraw.toString()
      )
  );

  // End function
  callback();
};
