const HDWalletProvider = require("@truffle/hdwallet-provider");
const web3 = require("web3");
const isInfura="5f8ee2028e694536993d5409ed4a8319";
const privatekeys = ['40186f69e3ca20183b76d676520be3b829f392b9a2ae9e776d923c59851340b2'];
//const NODE_API_KEY = "2JAiypNdm1qMbPUG1bSujLPrFZESmc3M";
const NODE_API_KEY = `https://eth-rinkeby.alchemyapi.io/v2/2JAiypNdm1qMbPUG1bSujLPrFZESmc3M`;
const  MNEMONIC="magic lake smooth entry reduce candy bleak tray text spawn tuition hill";
const  OWNER_ADDRESS="0xA13C2656c1403c4B4a82421C775E93f29c493B81";
//const NFT_CONTRACT_ADDRESS="0xD7e275c28463dD720883dC451ED1Daa7694B55C9";
//const NFT_CONTRACT_ADDRESS = "0x951706bc6900d5b718deb58f80912742172dcef3";
//const NFT_CONTRACT_ADDRESS = "0xb7f3aAddd91a12Aa8557a962f7b40602653df92b";
//const NFT_CONTRACT_ADDRESS = "0x4671F2E371AC50647C035DA12FCf20A4cC34E99d";
//const NFT_CONTRACT_ADDRESS = "0xD7e275c28463dD720883dC451ED1Daa7694B55C9";
//const NFT_CONTRACT_ADDRESS = "0x9e7d1369aA4ac325C74f8D9Fbd16c0547f349919";
//const NFT_CONTRACT_ADDRESS = "0x98Da1D27C16AD4380715e389251c891E03103bB8";
//const NFT_CONTRACT_ADDRESS = "0x951706bc6900D5b718dEb58f80912742172DcEf3";
const NFT_CONTRACT_ADDRESS = "0x5b447a5FC7917978A1fabfc0B4aAB845e0a06710";

const FACTORY_CONTRACT_ADDRESS=""
const NETWORK="rinkeby"
/*const MNEMONIC = process.env.MNEMONIC1;
const NODE_API_KEY = process.env.INFURA_KEY || process.env.ALCHEMY_KEY1;
const isInfura = !!process.env.INFURA_KEY;
const FACTORY_CONTRACT_ADDRESS = process.env.FACTORY_CONTRACT_ADDRESS1;
const NFT_CONTRACT_ADDRESS = process.env.NFT_CONTRACT_ADDRESS1;
const OWNER_ADDRESS = process.env.OWNER_ADDRESS1;
const NETWORK = process.env.NETWORK1;*/
const NUM_CREATURES = 12;
const NUM_LOOTBOXES = 4;
const DEFAULT_OPTION_ID = 0;
const LOOTBOX_OPTION_ID = 2;

if (!MNEMONIC || !NODE_API_KEY || !OWNER_ADDRESS || !NETWORK) {
  console.error(
    "Please set a mnemonic, Alchemy/Infura key, owner, network, and contract address."
  );
  return;
}

const NFT_ABI = [
  {
    constant: false,
    inputs: [
      {
        name: "_to",
        type: "address",
      },
    ],
    name: "mintTo",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
];

const FACTORY_ABI = [
  {
    constant: false,
    inputs: [
      {
        name: "_optionId",
        type: "uint256",
      },
      {
        name: "_toAddress",
        type: "address",
      },
    ],
    name: "mint",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
];

async function main() {
  const network =
   // NETWORK === "mainnet" || NETWORK === "live" ? "mainnet" : "rinkeby";
   NETWORK === "testnet" || NETWORK === "live" ? "testnet" : "rinkeby";
   /*const provider = new HDWalletProvider(
    MNEMONIC,
    isInfura
      ? "https://" + network + ".infura.io/v3/" + NODE_API_KEY
      : "https://eth-" + network + ".alchemyapi.io/v2/" + NODE_API_KEY
  );*/
    const provider =  new HDWalletProvider({
    privateKeys: privatekeys,
    providerOrUrl:  `https://eth-rinkeby.alchemyapi.io/v2/2JAiypNdm1qMbPUG1bSujLPrFZESmc3M`,
    numberOfAddresses: 1      });
  const web3Instance = new web3(provider);

  /*if (FACTORY_CONTRACT_ADDRESS) {
    const factoryContract = new web3Instance.eth.Contract(
      FACTORY_ABI,
      FACTORY_CONTRACT_ADDRESS,
      { gasLimit: "1000000" }
    );

    // Creatures issued directly to the owner.
    for (var i = 0; i < NUM_CREATURES; i++) {
      const result = await factoryContract.methods
        .mint(DEFAULT_OPTION_ID, OWNER_ADDRESS)
        .send({ from: OWNER_ADDRESS });
      console.log("Minted creature. Transaction: " + result.transactionHash);
    }

    // Lootboxes issued directly to the owner.
    for (var i = 0; i < NUM_LOOTBOXES; i++) {
      const result = await factoryContract.methods
        .mint(LOOTBOX_OPTION_ID, OWNER_ADDRESS)
        .send({ from: OWNER_ADDRESS });
      console.log("Minted lootbox. Transaction: " + result.transactionHash);
    }
  } else*/ 
   if (NFT_CONTRACT_ADDRESS) {
    const nftContract = new web3Instance.eth.Contract(
      NFT_ABI,
      NFT_CONTRACT_ADDRESS,
      { gasLimit: "1000000" }
    );
        
    // Creatures issued directly to the owner.
    for (var i = 0; i < NUM_CREATURES; i++) {
      const result = await nftContract.methods
        .mint(OWNER_ADDRESS, 1234, "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/")
        .send({ from: OWNER_ADDRESS });
      console.log("Minted creature. Transaction: " + result.transactionHash);
    }
  } else {
    console.error(
      "Add NFT_CONTRACT_ADDRESS or FACTORY_CONTRACT_ADDRESS to the environment variables"
    );
  }
}

main();