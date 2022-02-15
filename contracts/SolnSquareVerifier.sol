//pragma solidity >=0.4.21 <0.6.0;
pragma solidity >=0.5.6;
pragma experimental ABIEncoderV2;

// TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>

import "./Oraclize.sol";
//import "../contracts/zokrates/code/square/Verifier.sol";
import "./ERC721Mintable.sol";
import "./ERC721.sol";
import "./ERC721Metadata.sol";
import "../contracts/zokrates/code/square/squareVeri.sol";


// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class

contract SolnSquareVerifier is ERC721Mintable, squareVeri {

// TODO define a solutions struct that can hold an index & an address
address contractOwner = 0x88A6a89522cABed146e8F185C3766cA74327a665;
uint256 index = 0;
struct solutions{
    uint256 index;
    bool exists;
    address owner;
}
//uint256 totalSupplyCount = ERC721Mintable.totalSupplyToken();
//string baseTokenURIMeta = ERC721Mintable.baseTokenURI();

// TODO define an array of the above struct
solutions[] zokSolutions;


// TODO define a mapping to store unique solutions submitted
mapping (uint256 => solutions) uniSolutions;



// TODO Create an event to emit when a solution is added
event solutionAdded(uint256 index);
event NFTminted(uint256 tokenId);


// TODO Create a function to add the solutions to the array and emit the event
function addSolutions(address owner) public returns(uint256){
    uniSolutions[index] = solutions({
                                        index: index,
                                        exists : true, 
                                        owner: owner
                                        
                                        });
    zokSolutions.push(uniSolutions[index]);
    //return uniSolutions[index].exists;
    return zokSolutions.length;
    index++;
    emit solutionAdded(index);
}



// TODO Create a function to mint new NFT only after the solution has been verified
//  - make sure the solution is unique (has not been used before)
//  - make sure you handle metadata as well as tokenSuply


function mintNFT(uint256 totalSupplyCount,address owner, uint256 tokenId, string memory tokenURI, Verifier.Proof memory proof,uint[2] memory input) public returns(bool){
    require(squareVeri.verifyzok(proof, input) == true, "The solution hasnt been verified");
    //require(zokSolutions[index].owner != contractOwner, "The tokenId does not represent a valid token");
    require(totalSupplyCount < 11, "Total token Supply has ended");

    for(uint8  i = 0; i<= zokSolutions.length; i++ ){
        if(zokSolutions[i].exists == false) {
            ERC721Mintable.mint(owner, tokenId, tokenURI);
            ERC721Mintable.setTokenURI(tokenURI, tokenId);
            emit NFTminted(tokenId);
            return true; 
            }  
        }    
      //index++; 
    }


}
























