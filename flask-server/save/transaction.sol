// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HighRiskTransaction {
    address public owner;
    mapping(address => uint256) balances;

    constructor() {
        owner = msg.sender;
    }

    function deposit() public payable {
        balances[msg.sender] += msg.value;
    }

    function withdraw(uint256 amount) public {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        (bool sent, ) = msg.sender.call{value: amount}("");
        require(sent, "Transfer failed");
        balances[msg.sender] -= amount;
    }

    function transfer(address to, uint256 amount) public {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        (bool sent, ) = to.call{value: amount}("");
        require(sent, "Transfer failed");
        balances[msg.sender] -= amount;
    }

    function selfDestruct() public {
        require(msg.sender == owner, "Only the owner can self-destruct");
        selfdestruct(payable(owner));
    }
}
