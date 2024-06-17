//SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.0;

contract ArrayTest {
    uint[3] ages = [15, 25, 35]; // 고정배열
    int[] marks; // 동적배열
    
    function updateAges(uint index, uint val) public {
        if(index>=0 && index <=2)
            ages[index] = val;
    }
    function initMarks() public {
        marks = new int[](5); 
    }
    function appendMark(int mark) public {
        marks.push(mark);
    }
    function popMark() public {
        marks.pop();
    }
    function getMarks() public view returns(int[] memory) {
        return marks;
    }
    function getAges() public view returns(uint[3] memory) {
        return ages;
    }
    function getLenOfArr() pure public returns(uint) {
        uint8[3] memory intArr = [0, 1, 2];
        return intArr.length;
    }
}