// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface MaliciousContract {
    function maliciousFunction(address payable _recipient) external;
}

contract SimpleTransaction {
    address public owner;
    
    //Get owner address before deploying
    constructor() {
        owner = msg.sender; 
    }
    //checking address belong to owner or not
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    //getting partner address and sending ethereum
    function transferFunds(address payable _recipient) public onlyOwner payable {
        require(_recipient != address(0), "Invalid recipient address");
        require(msg.value > 0, "Invalid amount");
        
        //reentrancy attack
        MaliciousContract(_recipient).maliciousFunction(_recipient);

        (bool success, ) = _recipient.call{value: msg.value}("");
        require(success, "Transfer failed");
    }

    receive() external payable {}
    
    //Get balance
    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
}
