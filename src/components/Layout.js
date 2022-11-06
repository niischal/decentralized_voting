import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './Navbar'
import Register from '../pages/Register';
import Vote from '../pages/Vote';
import Result from '../pages/Result'

function Layout({account, setAccount}) {
  return (
    <>
      <div className='container-fluid'>
        <div className="row">
          <Navbar account={account} setAccount={setAccount}/>
          <div className='col-10 text-center mt-5'>
            <Routes>
              <Route path='/Register' element={<Register/>}/>
              <Route path='/Vote' element={<Vote/>}/>
              <Route path='/Result' element={<Result/>}/>
            </Routes>
          </div>
        </div>
      </div>
    </>
  )
}

export default Layout