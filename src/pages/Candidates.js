import React, { useEffect, useState } from 'react'

function Candidates({contractData,account}) {
  const [candidates,setCandidates] = useState([])
  useEffect(()=>{
    getCandidates()
     // eslint-disable-next-line
  },[candidates])
  const getCandidates=async () => {
    const candidates= await contractData.distributedVoting.methods.getAllCandidates().call({from:account})
    setCandidates(candidates)
    console.log('candidates', candidates)
  }
  return (
    <div className='container mt-5'>
       <table className="table text-white">
        <thead>
            <tr>
                <th>
                    Candidate Names
                </th>
            </tr>
        </thead>
        <tbody>
          <tr>
            <td>Nepal</td>
          </tr>
        </tbody>
    </table>

        <div className="text-white" style={{position:'fixed', right:'25px', bottom:'25px'}}>
            <p className="btn btn-success">Add New</p>
    </div>
    </div>
  )
}

export default Candidates