import React from 'react'

function Register({distributedVoting}) {
  
  return (
    <div className='container'>
      <div className="form-row">
        <div className="mx-auto" style={{width:'25%',marginTop:'20%'}}>
          <input type="text" className="form-control" placeholder="First name"/>
        </div>
      </div><br/>
      <div className="form-row">
        <div className="mx-auto">
          <button className='btn btn-outline-primary'>Register</button>
        </div>
      </div>
    </div>
  )
}

export default Register