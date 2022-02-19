const HDWalletProvider = require("@truffle/hdwallet-provider");
const web3 = require("web3");
const isInfura="5f8ee2028e694536993d5409ed4a8319";
const privatekeys = ['40186f69e3ca20183b76d676520be3b829f392b9a2ae9e776d923c59851340b2'];
const fetch = require("node-fetch");

const NODE_API_KEY = `https://eth-rinkeby.alchemyapi.io/v2/2JAiypNdm1qMbPUG1bSujLPrFZESmc3M`;
const  MNEMONIC="magic lake smooth entry reduce candy bleak tray text spawn tuition hill";
const  OWNER_ADDRESS="0xA13C2656c1403c4B4a82421C775E93f29c493B81";

const NFT_CONTRACT_ADDRESS="0x7CC83FFa5A8B8a6abAeEe4fCfF43487d4cac403a";

const FACTORY_CONTRACT_ADDRESS=""
const NETWORK="rinkeby"

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

  "constant": false,
      "inputs": [
        {
          "name": "to",
          "type": "address"
        },
        {
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "name": "tokenURI",
          "type": "string"
        }
      ],
      "name": "mint",
      "outputs": [
        {
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
      //"signature": "0xd3fc9864"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "tokenURI",
          "type": "string"
        },
        {
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "setTokenURI",
      "outputs": [
        {
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function",
      "signature": "0x09a3beef"
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
    console.log(NFT_ABI, "THIS IS NFT ABI");
        
    // Creatures issued directly to the owner.
   //for (var i = 0; i < NUM_CREATURES; i++) {
      const result = await nftContract.methods
        .mint(OWNER_ADDRESS, 23 , "https://my-json-server.typicode.com/sani-ikram/Blockchain---RealEstate-Project/tokens/")
        .send({ from: OWNER_ADDRESS });

      console.log("Minted creature. Transaction: " + result.transactionHash);
        
      const result1 = await nftContract.methods
        .setTokenURI("https://my-json-server.typicode.com/sani-ikram/Blockchain---RealEstate-Project/tokens/",23)
        .call({ from: OWNER_ADDRESS });
      
        var metadata_url = JSON.stringify(result1);
       console.log(`Metadata URL: ${metadata_url}`);
       //console.log(metadata_url);
       const metadata = await fetch(metadata_url).then(res => res.json());
      console.log(`Metadata fetch response: ${JSON.stringify(metadata, null, 2)}`);
    }
  /*  task("token-uri", "Fetches the token metadata for the given token ID")
  .addParam("tokenId", "The tokenID to fetch metadata for")
  .setAction(async function (taskArguments, hre) {
    const contract = await getContract("NFT", hre);
    const response = await contract.tokenURI(taskArguments.tokenId, {
        gasLimit: 500_000,
    });
    
    const metadata_url = response;
    console.log(`Metadata URL: ${metadata_url}`);*/

    //const metadata = await fetch(metadata_url).then(res => res.json());
    //console.log(`Metadata fetch response: ${JSON.stringify(metadata, null, 2)}`);
//});
  //} /*else {
    //console(
     // "Add NFT_CONTRACT_ADDRESS or FACTORY_CONTRACT_ADDRESS to the environment variables");
   // }*/
    //console.log(result);
}

main();