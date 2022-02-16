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
    address payable public contractOwner = 0xA13C2656c1403c4B4a82421C775E93f29c493B81;
    address public contractERC721Mint = address(this);
    string public baseURI = "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/";



    struct tokenMap{
        address owner;
        uint256 tokenId;
        string tokenURI; 
    }
    tokenMap[] TokenMap;
  
    mapping(address => uint256) balances; // to create the balance of the address
    mapping(address => uint256) balanceContractToken;
    mapping(address => tokenMap) addressMintToken;
    mapping(uint256 => tokenMap) addressMintTokenInfo;
    
    //mapping(address => mapping (address => uint256)) allowed; // will allow the approved account to withdraw
    constructor () public { // to allocate total supply of the tokens for the contract 
        totalTokenSupply = 10;
        balanceContractToken[msg.sender] = totalTokenSupply;
       // balanceContractToken[msg.sender].push(totalTokenSupply);
       mint(contractOwner, 22, baseURI);
    }

    function mint(address to, uint256 tokenId,string memory tokenURI) public returns (uint256){
            //require(msg.sender == contractOwner, " Sender address is not same as that of the owner");
            super._mint(to, tokenId);
            string memory TokenURI = setTokenURI(tokenURI,tokenId);
            balances[to] = balances[to].add(1);
            addressMintTokenInfo[tokenId] = tokenMap({
                                            owner: to,
                                            tokenId: tokenId,
                                            tokenURI: TokenURI
                                            });
            TokenMap.push(addressMintTokenInfo[tokenId]);
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
        balances[msg.sender] = balances[msg.sender] -tokenCount;
        balances[to] = balances[to] + tokenCount;
        return true;}

    function getTokenInfo(uint256 tokenId) public returns (address owner, uint256 tokenID, string memory tokenURL){
        tokenMap memory tokenInfo = addressMintTokenInfo[tokenId];
        owner = addressMintTokenInfo[tokenId].owner;
        tokenId = tokenId;
        tokenURL = setTokenURI(baseURI, tokenId);}

        function claim(address to, uint256 tokenId) public payable returns (bool) {
            mint(to, tokenId,baseURI);
            contractOwner.transfer(1 ether);
            return true;
        }
    

       
    }

