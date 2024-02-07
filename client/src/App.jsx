import { useState,useEffect } from 'react'
import abi from "./contractJson/EthPay.json"
import {ethers} from "ethers"
import Memos from './components/Memos'
import Buy from './components/Buy'
import './App.css'
// import StickyHeadTable from './components/tableMUI'


function App() {
  const [state,setState]=useState({
    provider:null,
    signer:null,
    contract:null
  })

  const [account,setAccount]=useState('Not connected');

  useEffect(()=>{
    const template=async()=>{
      const contractAddres="0xe161A74b15BDB144eBbE7f1887390bD7799592E5";
      const contractABI=abi.abi;
      //Metamask part
      //1. In order do transactions on goerli testnet
      //2. Metmask consists of infura api which actually help in connectig to the blockhain
      try{

        const {ethereum}=window;
        const account = await ethereum.request({
          method:"eth_requestAccounts"
        })

        //whenever the account changes it reloads automatically
        window.ethereum.on("accountsChanged",()=>{
          window.location.reload()
        })

        setAccount(account);

        const provider = new ethers.providers.Web3Provider(ethereum);//read the Blockchain
        const signer =  provider.getSigner(); //write the blockchain
        
        const contract = new ethers.Contract(
          contractAddres,
          contractABI,
          signer
        )
        console.log(contract)

      setState({provider,signer,contract});
      }catch(error){
        console.log(error)
      }
    }
    template();
  },[])

  return (
    <div className='App' >
      <div className="top-container">
        <Buy state={state} />
        <p className='connection' style={{ marginTop: "10px", marginRight: "100px" }}>
          <big className='connectedAddress'><strong>Connected Account</strong> - {account}</big>
        </p>
      </div>
      
      <Memos state={state} />   

    {/* <StickyHeadTable /> */}
  </div>
  )
}

export default App;