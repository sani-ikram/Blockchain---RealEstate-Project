pragma solidity >= 0.5.6;
import 'openzeppelin-solidity/contracts/utils/Address.sol';
import 'openzeppelin-solidity/contracts/drafts/Counters.sol';
import 'openzeppelin-solidity/contracts/math/SafeMath.sol';
import 'openzeppelin-solidity/contracts/token/ERC721/IERC721Receiver.sol';
import "./Oraclize.sol";

contract Ownable {
    //  TODO's
    //  1) create a private '_owner' variable of type address with a public getter function
    address private _owner; // private variable 
    event TransferOwnership(address newOwner);
    // getter function of the 
    function getOwner() public view returns(address){
        return _owner;
    }
    //  2) create an internal constructor that sets the _owner var to the creater of the contract 
    /// Assign the contract to an owner
    constructor () internal {
        _owner = msg.sender;
        //_owner = msg.sender;
    }
    //  3) create an 'onlyOwner' modifier that throws if called by any account other than the owner.
    modifier onlyOwner(){
            require(isOwner(), "ERC721: Only owner can mint");
            _;
    }
    function isOwner() public view returns(bool) {
        return msg.sender == _owner;
    }
    
    //  4) fill out the transferOwnership function
    //  5) create an event that emits anytime ownerShip is transfered (including in the constructor)

    function transferOwnership(address newOwner) public onlyOwner {
        // TODO add functionality to transfer control of the contract to a newOwner.
        // make sure the new owner is a real address
        _transferOwnership(newOwner);
    }
    function _transferOwnership(address newOwner) internal {
        require (newOwner != address(0));
        address origOwner = msg.sender;
        emit TransferOwnership(newOwner);
        origOwner = newOwner;
    }
     event transferOwn();
}   
