// define a variable to import the <Verifier> or <renamedVerifier> solidity contract generated by Zokrates
//var sqVerifier = artifacts.require('squareVeri');
//var Proof = artifacts.require('../contracts/szokrates/code/square/proof');

// Test verification with correct proof
// - use the contents from proof.json generated from zokrates steps

    
// Test verification with incorrect proof
describe('match erc721 spec', function () {
    beforeEach(async function () { 
        
        this.contract = await sqVerifier.new();// Setting up the total token supply count to 50;
        this.proofObj = await Proof.proof.call();

        //console.log(this.contract, "This is a new contract");

        // TODO: mint multiple tokens
    })
    it('should fail when minting when address is not contract owner', async function () { 
       console.log("This is the proof");
        console.log(this.proofObj);
        
        //await this.contract.verifyzok(Proof.proof)
       // await this.contract.mint.call(account_two,tokenId,tokenURI, {from: account_two});
        
    })

});
