import './App.css';
import {useState, useEffect} from 'react'
import Web3 from 'web3';
import DistributedVoting from './truffle_abis/DistributedVoting'
import Layout from './components/Layout';
import { Route, Routes } from 'react-router-dom';




function App() {
  const initialContractData={
    distributedVoting:{},
    loading:true
  }
  const [account, setAccount]=useState([])
  const [contractData,setContractData]=useState(initialContractData)
  const [isAdmin,setIsAdmin] = useState(false)

  useEffect(() => {
    loadContract()
  },[])

  useEffect(()=>{
    checkAdmin()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[account])

  //Checks if currently connected address is admin
  const checkAdmin = async () => {
    let admin=false
    if(Boolean(account[0])){
      admin = await contractData.distributedVoting.methods.checkAdmin(account).call()
    }
    setIsAdmin(admin)
  }

  //Loads Contract
  const loadContract = async () => {
      const web3 = new Web3(window.ethereum)
      const networkId = await web3.eth.net.getId();

      // Load DistributedVoting Contract
      const contractData = DistributedVoting.networks[networkId]
      if(contractData){
        const contract = new web3.eth.Contract(DistributedVoting.abi, contractData.address)
        setContractData(contractData => ({...contractData,...{distributedVoting:contract}}))
      } else {
        console.log("DistributedVoting contract not deployed")
      }
      setContractData(contractData => ({...contractData,...{loading:false}}))
    
  }
  
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout account={account} setAccount={setAccount} isAdmin={isAdmin} distributedVoting={contractData.distributedVoting}/>}>
        </Route>
      </Routes>
    </>
  );
}

export default App;
