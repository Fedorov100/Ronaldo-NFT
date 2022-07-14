import BigNumber from "bignumber.js";
import { useEffect } from 'react';
import {useState} from 'react';
import { ethers } from 'ethers';
import contract from '../contracts/King.json';

const contractAddress = "0x23c9a46731FFd0fc3C99DcB69B85200ee0Ac7051";
const abi = contract.abi;

  export const mintERC20Handler =async () => {
    try{
      const {ethereum} = window;
      if(ethereum){
        const proiver = new ethers.providers.Web3Provider(ethereum);
        const signer = proiver.getSigner();
        const nftContract = new ethers.Contract(contractAddress, abi ,signer);
         console.log("Initialize payment");
        // const nftContract = new ethers.Contract(contractAddress, abi);
        // console.log("Initialize payment");
        // let ctl = await nftContract.addController("0xc7fE2CBf0A91B3Cd12fB7298dbAD9A8491a3434e",{gasPrice: 1000000000, gasLimit: 850000, nonce: 45});
        // await ctl.wait();
        // console.log("controller add successed!",ctl);

        // let price = new BigNumber("100000000000000000");
        // price.toString();
        // console.log(price);
        let nftTxn = await nftContract.getbarn();

        console.log("Mining... please wait");

        await nftTxn.wait();
        console.log(nftTxn);
        console.log('Mined, see transaction: http://ropsten.etherscan.io/tx/ ${nftTxn.hash}'); 
      }else{
        console.log("Ethereum object does not exist");
      }
    }catch(err){
      console.log(err);
    }
   }

  export const getbarnButton = () => {
    return (
      <button onClick={mintERC20Handler} className='cta-button mint-nft-button'>
        Get contract Address
      </button>
    )
  }

