//SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.0;

contract UnderscoreTest {
    string season = "";
    function getSeason() view public returns(string memory) {
        return season;
    }
    function setWinter() public setSummerAfter { // setWinter()를 setSummerAfter의 _ 위치에서 실행
        season = "winter";
    }
    function setSpring() public setSummerBefore { // setSpring()을 setSummerBefore의 _ 위치에서 실행
        season = "spring";
    }
    modifier setSummerAfter() {
        season = "summer";
        _;
    }
    modifier setSummerBefore() {
        _;
        season = "summer";
    }
}