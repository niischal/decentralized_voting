import React ,{useEffect, useState}from 'react'

function Result({account,contractData}) {
  const [candidateList,setCandidateList] = useState([])
  useEffect(() => {
    getCandidates()
  }, [candidateList.length])
  
  const getCandidates=async () => {
    if(!contractData.loading){
      const candidates = await contractData.distributedVoting.methods.getAllCandidates().call({from:account})
      setCandidateList(candidates)
      candidateList.sort((a,b)=> b.voteCount - a.voteCount)
    }
  }
  
  const ListEmpty = (candidateList.length===0)
  return (
    <div className='container mt-5'>
       <table className="table text-white">
        <thead>
            <tr>
                <th>
                    Candidate Names
                </th>
                <th>
                    Vote Counts
                </th>
            </tr>
        </thead>
        <tbody className='text-white'>
          {ListEmpty? <tr><td>Loading...</td></tr>
            :candidateList.map((c) => {
             return( 
              <tr key={c.candidateName}>
                <td>{c.candidateName}</td>
                <td>{c.voteCount}</td>
              </tr>
            )})
          }
        </tbody>
      </table>
    </div>
  )
}

export default Result