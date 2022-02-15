pragma solidity >=0.5.6 ;

import 'openzeppelin-solidity/contracts/utils/Address.sol';
import 'openzeppelin-solidity/contracts/drafts/Counters.sol';
import 'openzeppelin-solidity/contracts/math/SafeMath.sol';
import 'openzeppelin-solidity/contracts/token/ERC721/IERC721Receiver.sol';
import "./Oraclize.sol";
import "./Ownable.sol";

contract Pausable is Ownable{    
    //1) create a private '_paused' variable of type bool
    bool private _paused;
//  2) create a public setter using the inherited onlyOwner modifier 
    function setPause() public onlyOwner{
    }
//  3) create an internal constructor that sets the _paused variable to false
    constructor() internal {
                _paused = false;
    }
//  4) create 'whenNotPaused' & 'paused' modifier that throws in the appropriate situation
    modifier whenNotPaused(){
                require(!_paused);
                _;
    }
    modifier paused(){
                require(_paused);
                _;
    }

//  5) create a Paused & Unpaused event that emits the address that triggered the event
    event Paused(address account);
    event unPaused(address account);
    function pause()  public whenNotPaused{
                _paused = true;
                emit Paused(msg.sender);
            }
    function unpaused() public {
                _paused = false;
                emit unPaused(msg.sender);
    }
}