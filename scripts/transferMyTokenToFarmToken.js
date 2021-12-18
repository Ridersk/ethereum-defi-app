/*
  Script Truffle para interagir com o smart contract
*/

const MyToken = artifacts.require("MyToken");
const FarmToken = artifacts.require("FarmToken");

module.exports = async function (callback) {
  const accounts = await new web3.eth.getAccounts();
  const myToken = await MyToken.deployed();
  const farmToken = await FarmToken.deployed();

  // Retorna o número restante de tokens que o 'spender' poderá
  // gastar em nome do proprietário por meio de transferFrom.
  // This is zero by default.
  const allowanceBefore = await myToken.allowance(
    accounts[0], // Seleciona a primeira conta da lista
    farmToken.address
  );
  console.log(
    "Quantidade MyToken que eh permitido transferir para o smart contract antes da concessao: " +
      allowanceBefore.toString()
  );

  // Para permitir que o Smart Contract transferir MyToken (ERC-20) em nome da conta[0],
  // devemos permitir isso explicitamente.
  // Permitimos que o farmToken transfira x quantidade de MyToken em nosso nome
  await myToken.approve(farmToken.address, web3.utils.toWei("100", "ether"));

  // Valida que o farmToken agora pode mover x quantidade de MyToken em nosso nome
  const allowanceAfter = await myToken.allowance(
    accounts[0],
    farmToken.address
  );
  console.log(
    "Quantidade MyToken que eh permitido transferir para o smart contract depois da concessão: " +
      allowanceAfter.toString()
  );

  // Verifica a conta[0] e o equilíbrio do farmToken do MyToken antes e depois da transferência
  const balanceMyTokenInUserBeforeTransfer = await myToken.balanceOf(
    accounts[0]
  );
  const balanceMyTokenInSmartContractBeforeTransfer = await myToken.balanceOf(
    farmToken.address
  );
  console.log("*** My Token ***");
  console.log(
    "Saldo de MyToken na conta do usuario 'accounts[0]' antes da transferencia: " +
      web3.utils.fromWei(balanceMyTokenInUserBeforeTransfer.toString())
  );
  console.log(
    "Saldo de MyToken na conta do smart contract FarmToken antes da transferencia: " +
      web3.utils.fromWei(balanceMyTokenInSmartContractBeforeTransfer.toString())
  );

  console.log("*** Farm Token ***");
  const balanceFarmTokenInUserBeforeTransfer = await farmToken.balanceOf(
    accounts[0]
  );
  const balanceFarmTokenInSmartContractBeforeTransfer =
    await farmToken.balanceOf(farmToken.address);
  console.log(
    "Saldo de FarmToken na conta do usuario 'accounts[0]' antes da transferencia: " +
      web3.utils.fromWei(balanceFarmTokenInUserBeforeTransfer.toString())
  );
  console.log(
    "Saldo de FarmToken na conta do smart contract FarmToken antes da transferencia: " +
      web3.utils.fromWei(
        balanceFarmTokenInSmartContractBeforeTransfer.toString()
      )
  );
  // Call Deposit function from FarmToken
  console.log("Chamar funcao de deposito");
  await farmToken.deposit(web3.utils.toWei("100", "ether"));
  console.log("*** My Token ***");
  const balanceMyTokenInUserAfterTransfer = await myToken.balanceOf(
    accounts[0]
  );
  const balanceMyTokenInSmartContractAfterTransfer = await myToken.balanceOf(
    farmToken.address
  );
  console.log(
    "Saldo de MyToken na conta do usuario 'accounts[0]' depois da transferencia: " +
      web3.utils.fromWei(balanceMyTokenInUserAfterTransfer.toString())
  );
  console.log(
    "Saldo de MyToken na conta do smart contract depois da transferencia: " +
      web3.utils.fromWei(balanceMyTokenInSmartContractAfterTransfer.toString())
  );

  console.log("*** Farm Token ***");
  const balanceFarmTokenInUserAfterTransfer = await farmToken.balanceOf(
    accounts[0]
  );
  const balanceFarmTokenInSmartContractAfterTransfer =
    await farmToken.balanceOf(farmToken.address);
  console.log(
    "Saldo de FarmToken na conta do usuario 'accounts[0]' depois da transferencia: " +
      web3.utils.fromWei(balanceFarmTokenInUserAfterTransfer.toString())
  );
  console.log(
    "Saldo de FarmToken na conta do smart contract depois da transferencia: " +
      web3.utils.fromWei(
        balanceFarmTokenInSmartContractAfterTransfer.toString()
      )
  );

  // End function
  callback();
};
