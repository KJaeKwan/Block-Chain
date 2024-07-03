//SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.0;

contract FallbackCounter {
   uint public nOfFallback = 0;
   fallback() external { nOfFallback += 1; } // 입금 불가능
}

contract CallFallback {
    function callFallbackCounter(FallbackCounter fb) public returns (bool) {
        address payable _fb = payable(address(fb));
        return (_fb.send(11 wei));  // 수신측 fallback이 호출되지 않고, 입금실패의 예외 발생
    }
}