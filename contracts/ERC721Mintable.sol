pragma solidity >=0.5.6 ;

import 'openzeppelin-solidity/contracts/utils/Address.sol';
import 'openzeppelin-solidity/contracts/drafts/Counters.sol';
import 'openzeppelin-solidity/contracts/math/SafeMath.sol';
import "./Ownable.sol";
import "./ERC721.sol";
import "./ERC721Metadata.sol";
import "./ERC721Enumerable.sol";

contract ERC721Mintable is Ownable, ERC721Metadata {
    using SafeMath for uint256;


    uint256 public totalTokenSupply;
    address public contractOwner = 0x88A6a89522cABed146e8F185C3766cA74327a665;
    address public contractERC721Mint = address(this);



    struct tokenMap{
        address owner;
        uint256 tokenId;
        string tokenURI; 
    }
    tokenMap[] TokenMap;
  
    mapping(address => uint256) balances; // to create the balance of the address
    mapping(address => uint256) balanceContractToken;
    mapping(address => tokenMap) addressMintToken;
    
    //mapping(address => mapping (address => uint256)) allowed; // will allow the approved account to withdraw
    constructor () public { // to allocate total supply of the tokens for the contract 
        totalTokenSupply = 32;
        balanceContractToken[msg.sender] = totalTokenSupply;
       // balanceContractToken[msg.sender].push(totalTokenSupply);
    }

    function mint(address to, uint256 tokenId,string memory tokenURI) public returns (uint256){
            require(msg.sender == contractOwner, " Sender address is not same as that of the owner");
            super._mint(to, tokenId);
            //setTokenURI(tokenURI,tokenId);
            balances[to] = balances[to].add(1);
            return balances[to];
    }

    function balanceOfAddress(address owner) public returns (uint256){
        return ERC721.balanceOf(owner);
    }

    function totalSupplyToken()public view returns (uint256) {
        return totalTokenSupply;
    }

    function setTokenURI(string memory tokenURI, uint256 tokenId)public returns (string memory) {
        //return tokenURI;
        return ERC721Metadata.setTokenURI(tokenURI, tokenId);

    }

    function transferFromAdd(address to, uint256 tokenCount) public returns (bool){
       
       require(tokenCount >= balances[msg.sender], "There are not enough tokens");
        balances[msg.sender] = balances[msg.sender].sub(tokenCount);
        balances[to] = balances[to].add(tokenCount);
        return true;}

       
    }


