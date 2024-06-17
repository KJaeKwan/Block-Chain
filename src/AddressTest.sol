//SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.0;

contract AddressTest {
    address owner;
    address payable receiver; 
    uint balanceOfOwner;
    constructor() {
        owner=msg.sender;
        balanceOfOwner = owner.balance; 
    }
    // 신기하게도 payable 선언하면 코드 없이도 입금 가능!
    function deposit() payable public {
    }
    function setReceiver(address payable addr) public {
        receiver=addr;
    }
    function getReceiver() view public returns(address) {
        return receiver;
    }
    // 컨트랙 자체의 잔고
    function getBalanceOfThis() public view returns(uint) {
        return address(this).balance;
    }
    function getBalanceOfOwner() public view returns(uint) {
        return owner.balance;
    }
    function getBalanceOfReceiver() public view returns(uint) {
        return receiver.balance;
    }
    function send() public payable {
        require(receiver.send(111)); // require로 예외처리
    }
    function transfer() public payable {
        receiver.transfer(11111);
    }
    function callValue() public payable {
        (bool success, ) = receiver.call{value: 11111}("");
        require(success, "transfer call failed.");
        (success, ) = receiver.call{gas: 10, value: 11111}("");
        require(success, "transfer call failed with gas 10.");
    }
}