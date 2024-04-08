// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleTransaction {
    address public owner;

    // Get owner address before deploying
    constructor() {
        owner = msg.sender;
    }

    // Checking address belongs to owner or not
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    // Getting partner address and sending ethereum with gas limit and loop
    function transferFunds(address payable _recipient) public onlyOwner payable {
        require(_recipient != address(0), "Invalid recipient address");
        require(msg.value > 0, "Invalid amount");

        uint256 amount = msg.value;
        uint256 gasLimit = 2300; // Gas limit for the external call

        // Transfer funds in batches to avoid hitting gas limit
        while (amount > 0) {
            uint256 transferAmount = amount > gasLimit ? gasLimit : amount;

            (bool success, ) = _recipient.call{value: transferAmount, gas: gasLimit}("");
            require(success, "Transfer failed");

            amount -= transferAmount;
        }
    }

    receive() external payable {}

    // Get balance
    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
}
