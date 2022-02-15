// migrating the appropriate contracts
//var SquareVerifier = artifacts.require("./SquareVerifier.sol");
var SolnSquareVerifier = artifacts.require("./SolnSquareVerifier.sol");
var ERC165 = artifacts.require("./ERC165.sol");
var ERC721 = artifacts.require("./ERC721.sol");
var ERC721Completed = artifacts.require("./ERC721Completed.sol");
var Enumerable = artifacts.require("./Enumerable.sol");
var ERC721Metadata = artifacts.require("./ERC721Metadata.sol");
var Migrations = artifacts.require("./Migrations.sol");
var Oraclize = artifacts.require("./Oraclize.sol");
var Ownable = artifacts.require("./Ownable.sol");
var Pausable = artifacts.require("./Pausable.sol");



module.exports = function(deployer) {
  deployer.deploy(SquareVerifier);
  deployer.deploy(SolnSquareVerifier);
  deployer.deploy(ERC165);
  deployer.deploy(ERC721);
  deployer.deploy(ERC721Completed);
  deployer.deploy(Enumerable);
  deployer.deploy(ERC721Metadata);
  deplpyer.deploy(Migrations);
  deployer.deploy(Oraclize);
  deployer.deploy(Ownable);
  deployer.deploy(Pausable);
};
