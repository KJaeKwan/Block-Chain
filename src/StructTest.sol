//SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.0;

contract StructTest {
    struct Student {
        uint num;
        string name;
        bool isEnrolled;
    }
    Student s1=Student(201911111,"jslim",true);
    Student s2;
    // string 인자는 메모리로 해줌
    function setStudent2(uint n, string memory sn, bool e) public {
        s2.num = n;
        s2.name = sn;
        s2.isEnrolled = e;
    }
   function getStudent1() public view returns(uint, string memory, bool){
       return (s1.num, s1.name, s1.isEnrolled); // 괄호로 묶어서 여러개 반환 가능
   }
   function getStudent2() public view returns(uint, string memory, bool){
       return (s2.num, s2.name, s2.isEnrolled);
   }
   function getStudentName() pure public returns(string memory) {
       Student memory s3 = Student(201911112, "jsl3", true);
       return s3.name;
   }
}