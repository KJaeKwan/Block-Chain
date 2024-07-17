//SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.0;

contract BankV4 {
    address owner;
    mapping (address => uint) balanceOf;
    constructor() {
        owner = msg.sender;
        _mint(1000000000000000000000000);
    }    
    function deposit(uint amount) payable public onlyOwner {
        require(msg.value == amount);
        balanceOf[msg.sender] += amount;
    }
    function forwardTo(address receiver, uint amount) payable public onlyOwner {
        require(balanceOf[msg.sender] >= amount);
        balanceOf[msg.sender] -= amount;
        balanceOf[receiver] += amount;
    }
    function withdraw(address payable receiver, uint amount) public onlyOwner {
        require(balanceOf[receiver] >= amount && address(this).balance >= amount);
        balanceOf[receiver] -= amount;
        receiver.transfer(amount);
    }
    function getBalance() public view returns(uint, uint) {
        return (address(this).balance, balanceOf[owner]);
    }
    function getBalanceOf(address addr) public view returns (uint) {
        return balanceOf[addr];
    }
    function _mint(uint amount) internal onlyOwner {
        balanceOf[msg.sender] += amount;
    }
    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }
}