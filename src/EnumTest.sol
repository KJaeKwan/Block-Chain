//SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.0;

contract EnumTest {
    enum Day {MONDAY,TUESDAY,WEDNESDAY,THURSDAY,FRIDAY,SATURDAY,SUNDAY}
    Day myDay = Day.FRIDAY; //index int4
    
    function getMyDay() public view returns(Day) {
        return myDay;   // 순서 반환
    }
    function setMyDay(Day d) public {
        myDay = d;
    }
    // uint를 넘겨줘도 기본으로 uint8로 변환
    function setMyDayInt(uint d) public {
        myDay = Day(d);
    }
}