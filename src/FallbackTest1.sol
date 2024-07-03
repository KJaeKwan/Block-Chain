//SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.0;

contract FallbackTest1 {    
    receive() external payable {} //정상
    //receive() {} //오류. external로 선언되어야 함
    //receive() external {} //오류. payable로 선언되어야 함
    //function receive() external payable {} //경고 (키워드 function)
    fallback() external {} //정상. 송금없는 경우 사용.
    //fallback() {} //오류. external로 선언되어야 함
    //fallback() external payable {} //정상. 송금있는 경우 사용.
    //function fallback() external payable {} //경고 (키워드 function)
    //function() external payable {} //오류. 버전 0.6.x 이하에서는 이렇게 선언하였다.
    //fallback(bytes calldata _input) external {} //오류. 반환 필요
    //fallback(bytes calldata _input) external returns(bytes memory _output) {} //정상. 버전 0.7 이상.
}