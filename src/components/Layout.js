import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './Navbar'
import Register from '../pages/Register';
import Vote from '../pages/Vote';
import Result from '../pages/Result'
import ConnectWallet from '../pages/ConnectWallet';
import Election from '../pages/Election';
import BallotView from '../pages/BallotView';
import VoterHomePage from '../pages/VoterHomePage';
import AdminHomePage from '../pages/AdminHomePage';
import NotFound from '../pages/NotFound'

function Layout({account, setAccount, isAdmin, distributedVoting}) {
  
  let isConnected = Boolean(account[0])

  const notConnectedPage= (<Routes>
                            <Route path='/' element={<ConnectWallet/>}/>
                            <Route path='*' element={<NotFound/>}/>
                          </Routes>)
  const voterPages= (<div className='col-10 text-center mt-5 bg-dark text-white'>
                      <Routes>
                        <Route path='/' element={<VoterHomePage/>}/>
                        <Route path='/Register' element={<Register/>}/>
                        <Route path='/Vote' element={<Vote/>}/>
                        <Route path='/Result' element={<Result/>}/>
                        <Route path='*' element={<NotFound/>}/>
                      </Routes>
                    </div>)
  const adminPages= (<div className='col-10 text-center mt-5 bg-dark text-white'>
                      <Routes>
                        <Route path='/' element={<AdminHomePage/>}/>
                        <Route path='/Election' element={<Election/>}/>
                        <Route path='/BallotView' element={<BallotView/>}/>
                        <Route path='/Result' element={<Result/>}/>
                        <Route path='*' element={<NotFound/>}/>
                      </Routes>
                    </div>)

  return (
    <>
      <div className='container-fluid' style={{height:'100%'}}>
        <div className="row">
          <Navbar account={account} setAccount={setAccount} isAdmin={isAdmin}/>
          <>
            {!isConnected
            ? notConnectedPage
            : isAdmin? adminPages : voterPages
            }
          </>
        </div>
      </div>
    </>
  )
}

export default Layout