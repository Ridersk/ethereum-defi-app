// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// Versao simplificada de um Smart Contract para gerenciamento dos tokens "FarmToken"
// (Token interno) e "MyToken" (Token externo)
// Em uma versao mais elaborada poderia ser um smart contract para um jogo NFT, por exemplo
contract FarmToken is ERC20 {
    using Address for address;
    using SafeERC20 for IERC20;
    // using SafeMath for uint256;

    IERC20 public token;

    constructor(address _token) ERC20("FarmToken", "FRM") {
        token = IERC20(_token);
    }

    function balance() public view returns (uint256) {
        /*Retorna o saldo do smart contract*/
        return token.balanceOf(address(this));
    }

    function deposit(uint256 _amount) public {
        /*Deposita FarmeTokens para o usuario.*/

        // Validador: retorna erro se _amount for <= 0
        require(_amount > 0, "amount cannot be 0");

        // Transfere MyToken do usuario para o smart contract
        token.safeTransferFrom(msg.sender, address(this), _amount);

        // Cunha (mint) FarmTokens e transfere para o usuario
        _mint(msg.sender, _amount);
    }


    function withdraw(uint256 _amount) public {
        /*Realiza o saque do FarmToken*/

        // Queima o FarmToken do usuario
        _burn(msg.sender, _amount);

        token.safeTransfer(msg.sender, _amount);
    }
}
