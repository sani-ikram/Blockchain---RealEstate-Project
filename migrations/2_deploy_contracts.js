// migrating the appropriate contracts
//var SquareVerifier = artifacts.require("./SquareVerifier.sol");
//var SolnSquareVerifier = artifacts.require("./contracts/SolnSquareVerifier.sol");
var ERC165 = artifacts.require("./ERC165.sol");
var ERC721 = artifacts.require("./ERC721.sol");
var ERC721Mintable = artifacts.require("./ERC721Mintable.sol");
var Enumerable = artifacts.require("./ERC721Enumerable.sol");
var ERC721Metadata = artifacts.require("./ERC721Metadata.sol");
var Migrations = artifacts.require("./Migrations.sol");
var Verifier = artifacts.require("../contracts/zokrates/code/square/verifier.sol");
var squareVeri = artifacts.require("../contracts/zokrates/code/square/squareVeri.sol");
var solSquareVeri = artifacts.require("../contracts/zokrates/code/square/SolnSquareVerifier.sol");




module.exports = function(deployer) {

  deployer.deploy(ERC721);
  deployer.deploy(ERC721Mintable);
  deployer.deploy(Enumerable);
  deployer.deploy(ERC721Metadata);
  deployer.deploy(Migrations);
  deployer.deploy(Verifier);
  deployer.deploy(squareVeri);
  deployer.deploy(solSquareVeri);


};