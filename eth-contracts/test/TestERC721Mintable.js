//var ERC721MintableComplete = artifacts.require('ERC721MintableComplete');
var ERC165 = artifacts.require("./build/contracts/ERC165.js");
var ERC721 = artifacts.require("./build/contracts/ERC721.js");
var ERC721Mintable = artifacts.require("./build/contracts/ERC721Mintable.js");
var Enumerable = artifacts.require("./build/contracts/ERC721Enumerable.js");
var ERC721Metadata = artifacts.require("./build/contracts/ERC721Metadata.js");


contract('TestERC721Mintable', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];

    describe('match erc721 spec', function () {
        beforeEach(async function () { 
            //this.contract = await ERC721MintableComplete.new({from: account_one});
            this.contract = await ERC721Mintable.new({from: account_one});

            // TODO: mint multiple tokens
        })

        it('should return total supply', async function () { 
            let tokenId = 1234;
            let tokenURI = "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/";
            console.log(tokenURI);
            let result = await ERC721Mintable.mint( account_two, tokenId, tokenURI,{from: account_one});
            console.log(result);
        })

        it('should get token balance', async function () { 
            
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () { 
            
        })

        it('should transfer token from one owner to another', async function () { 
            
        })
    });

    describe('have ownership properties', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new({from: account_one});
        })

        it('should fail when minting when address is not contract owner', async function () { 
            
        })

        it('should return contract owner', async function () { 
            
        })

    });
})