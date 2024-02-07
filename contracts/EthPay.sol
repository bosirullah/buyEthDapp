// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract EthPay{
    struct Memo{
        string name;
        string message;
        uint timestamp;
        address from;
    }

    Memo[] memos;

    // need to make the address payable as owner is going to recieve funds.
    address payable owner;
    constructor(){
        owner = payable(msg.sender);
    }

    function payEth(string calldata _name,string calldata _message) external payable {
        require(msg.value > 0,"Please pay more than 0 ether");
        owner.transfer(msg.value);
        memos.push(Memo(_name,_message,block.timestamp,msg.sender));
    }

    function getMemos() public view returns(Memo[] memory){
        return memos;
    }

}

// 0xe161A74b15BDB144eBbE7f1887390bD7799592E5


