// Test if a new solution can be added for contract - SolnSquareVerifier

// Test if an ERC721 token can be minted for contract - SolnSquareVerifier
// define a variable to import the <Verifier> or <renamedVerifier> solidity contract generated by Zokrates
var sqVerifier = artifacts.require('SolnSquareVerifier');


// Test verification with correct proof
// - use the contents from proof.json generated from zokrates steps

    
// Test verification with incorrect proof
describe('match erc721 spec', function () {
    beforeEach(async function () { 
        
        this.contract = await sqVerifier.new();// Setting up the total token supply count to 50;
        a = await Proof.proof.a;

    })
    it('Test when the proof is successful ', async function () { 

        let result = await this.contract.verifyzok.call(Proof.proof, Proof.inputs);
        console.log(result);
        assert.equal(result, true, "The output is not successful");

        
    })
    it('Test when the proof is not successful ', async function () { 

        let result = await this.contract.verifyzok.call(Proof2.proof, Proof2.inputs);
        console.log(result);
        assert.equal(result, false, "The output is successful");

        
    })

});
