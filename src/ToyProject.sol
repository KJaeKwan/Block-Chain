//SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity  ^0.8.0;

contract Customer {
    struct Customers {
        uint id;
        string name;
        string ph;
        string addr;
    }
    mapping(address => Customers) customerMap;
    mapping(uint => address) addressById;
    
    // 고객정보 입력 함수
    function addCustomer(uint _id, string memory _name, string memory _ph, string memory _home) public {
        Customers memory c = Customers(_id, _name, _ph, _home);
        customerMap[msg.sender] = c; 
        addressById[_id] = msg.sender;
    }
    // 배송지 주소 조회 함수
    function getHomeAddress() public view returns(string memory){
        return customerMap[msg.sender].addr;
    }
    // 고객ID 조회 함수
    function getId() public view returns(uint){
        return customerMap[msg.sender].id;
    }
}

contract Order {
    Customer c;
    uint balance;

    struct Orders {
        uint id;
        string name;
        uint amount;
        uint price;
        uint time;
        string state;
        string addr;
    }
    mapping (address => uint) IdByAddr;
    mapping (uint => address payable) addressById;
    mapping (uint => Orders) ordersById;
    constructor() {
        c = new Customer();
        balance = 0;
    }

    // 주문 함수
    function placeOrder (uint _id, uint _p, string memory _n, uint _amount) payable public {
        string memory _addr = c.getHomeAddress();
        Orders memory o = Orders(_id, _n, _amount, _p, block.timestamp, "Ordered", _addr);
        uint id=c.getId();
        ordersById[id]=o;
        balance += _amount * _p;
    }
    // 고객 정보 입력 함수
    function addC(uint _id, string memory _name, string memory _ph, string memory _home) public {
        c.addCustomer(_id, _name, _ph, _home);
    }
    // 배송지 주소 조회
    function getHomeAddr() view public returns(string memory){
        return c.getHomeAddress();
    }
    // 주문처리 상황 조회 함수
    function getStatus() public view returns(string memory) {
        uint _id = c.getId();
        return ordersById[_id].state;
    }
    // 주문처리 상황 갱신 함수
    function updateStatus(uint _id, string memory _s) public payable {
        ordersById[_id].state = _s;
    }
    // 주문내역 출력 함수
    function getOrderItem() public view returns(uint, string memory, string memory, string memory){
        uint _id = c.getId();
        Orders memory od = ordersById[_id];
        return(od.id, od.name, od.state, od.addr);
    }
    // 주문ID로 주문내역 조회 함수
    function getOrderById(uint _id) public view returns(uint, string memory, string memory, string memory){
        Orders memory od = ordersById[_id];
        return(od.id, od.name, od.state, od.addr);
    }
    // 주문 개수 조회 함수
    function getNOrder() public view returns(uint){
        uint _id = c.getId();
        return ordersById[_id].amount;
    }
    // 주문 총액 조회 함수
    function getTotalOrderAmount() public view returns(uint){
        uint _id = c.getId();
        Orders memory od = ordersById[_id];
        uint totalPrice = od.amount * od.price;
        return totalPrice; 
    }
    // 컨트랙 잔고 확인 함수
    function queryBalance() public view returns(uint){
        return balance;
    }
}