//SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.0;

contract Hello1 {
    string private hello;
    address private owner;
    event PrintLog(address addr, string s);

    constructor(string memory _hello) {
        hello = _hello;
        owner = msg.sender;
    }
    function sayHello() view public returns(string memory) {
        return hello;
    }
    modifier isOwner() {
        if (msg.sender != owner) {
            revert();
        }
        _;
    }
    function setHello() public {
        string memory s = "";
        if (msg.sender == owner) {
            s = "Hello";
        } else {
            s = "Olleh";
        }
        emit PrintLog(msg.sender, s);
        hello = s;
    }
    function compareTo(string memory _str) view public returns(bool) {
        bool isEqual = false;
        if (keccak256(bytes(hello)) == keccak256(bytes(_str))) {
            isEqual = true;
        }
        return isEqual;
    }
    function getBalance() view public isOwner returns(uint) {
        return address(this).balance;
    }
}