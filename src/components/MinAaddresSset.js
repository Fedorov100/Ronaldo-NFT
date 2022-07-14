import BigNumber from "bignumber.js";
import { useEffect } from 'react';
import {useState} from 'react';
import { ethers } from 'ethers';
import contract from '../contracts/Mine.json';

const contractAddress = "0xaBdE665e0C6ae8cb2ceC805d2734A14EE07286ad";
const abi = contract.abi;

  export const MineSethandler =async () => {
    try{
      const {ethereum} = window;
      if(ethereum){
        const proiver = new ethers.providers.Web3Provider(ethereum);
        const signer = proiver.getSigner();
        const nftContract = new ethers.Contract(contractAddress, abi ,signer);
        console.log("Initialize payment");
        // console.log("Initialize payment");
        let ctl = await nftContract.setInit("0xC80339534D8e63485504F661A0333De9D525CBf8","0xC80339534D8e63485504F661A0333De9D525CBf8",{gasPrice: 1000000000, gasLimit: 850000, nonce: 45});
        // await ctl.wait();
        // console.log("controller add successed!",ctl);

        console.log('Mined, see transaction: http://ropsten.etherscan.io/tx/ ${nftTxn.hash}'); 
      }else{
        console.log("Ethereum object does not exist");
      }
    }catch(err){
      console.log(err);
    }
   }

  export const MineSetButton = () => {
    return (
      <button onClick={MineSethandler} className='cta-button mint-nft-button'>
      Set King address!
      </button>
    )
  }

