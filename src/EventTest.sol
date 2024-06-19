//SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.0;

contract EventTest {
    event MyLog(string my);
    function myFunction() public {
        emit MyLog("Hello World!");
    }
}