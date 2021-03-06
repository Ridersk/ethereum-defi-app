// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// Smart Contract que representa um Token
contract MyToken is ERC20 {
    constructor() ERC20("MyToken", "MTKN") {
        _mint(msg.sender, 999999999999999999999998);
    }
}
