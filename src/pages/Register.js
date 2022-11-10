import React,{useState} from 'react'

function Register({contractData,account}) {
  const [nameInput,setNameInput] = useState('')
  const handleNameChange = (event) => {
    setNameInput(event.target.value)
  }
  const registerVoter = async () => {
    await contractData.distributedVoting.methods.registerVoter(nameInput).send({from:account})
  }
  return (
    <div className='container'>
      <div className="form-row">
        <div className="mx-auto" style={{width:'25%',marginTop:'20%'}}>
          <input type="text" value={nameInput} onChange={handleNameChange} className="form-control" placeholder="First name"/>
        </div>
      </div><br/>
      <div className="form-row">
        <div className="mx-auto">
          <button className='btn btn-outline-primary' onClick={registerVoter}>Register</button>
        </div>
      </div>
    </div>
  )
}

export default Register