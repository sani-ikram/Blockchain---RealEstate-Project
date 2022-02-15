var ERC721M = artifacts.require('ERC721Mintable');



contract('TestERC721Mintable', accounts => {


    const account_one = "0x88a6a89522cabed146e8f185c3766ca74327a665";
    const account_two = "0x8742ff5d6aa94173cc6fad836140f49b4fadad38";
    const account_three = "0xca18e74560612d391a8083ed0eead9dcb91b1bc1";

    describe('match erc721 spec', function () {
        beforeEach(async function () { 
            
            this.contract = await ERC721M.new(50,{from: account_one});// Setting up the total token supply count to 50

            //console.log(this.contract, "This is a new contract");

            // TODO: mint multiple tokens
        })
        it('should return total supply', async function () { 
            
            let result = await this.contract.totalSupplyToken.call({from: account_one});
            console.log (result);
            assert.equal(result, 50); // total supply count is of 50
        })

        it('should get token balance', async function () { 
            let tokenId = 1234;
            let tokenURI = "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/";
            let result = await this.contract.mint.call(account_two,tokenId,tokenURI, {from: account_one});
            assert.equal(result, 1, "No token has been minted for the address");
            
        })

 
        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () { 
            let tokenId = "1234";
            let tokenURI = "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/";
            let result = await this.contract.setTokenURI.call(tokenURI, tokenId);
            assert.equal(result,"https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1234" );
            

        })

        it('should transfer token from one owner to another', async function () { 
            let tokenId = 1234;
            let tokenURI = "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/";
            let result1 = await this.contract.mint.call(account_two,tokenId,tokenURI, {from: account_one});
            let result  = await this.contract.transferFromAdd.call(account_three,1,{from: account_two});
            assert.equal(result, true,"Token has not been transferred from one account to another account");
        })
    });

    describe('have ownership properties', function () {
        beforeEach(async function () { 
            this.contract = await ERC721M.new(50,{from: account_one});// Setting up the total token supply count to 50
        })

        it('should fail when minting when address is not contract owner', async function () { 
            console.log("This is a failing result for the owner");
            tokenId = 1234;
            let tokenURI = "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/";

            await this.contract.mint.call(account_two,tokenId,tokenURI, {from: account_two});
            
        })

        it('should return contract owner', async function () { 
            
            let result = await this.contract.contractOwner.call();
            result = result.toLowerCase();
            console.log(result, "This is the contract Owner");
            assert.equal(result, account_one, "These two owners are equal");
        })

    });
})