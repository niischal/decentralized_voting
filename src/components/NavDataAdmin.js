import { BsClipboard, BsClipboardCheck, BsHouse, BsNewspaper } from 'react-icons/bs'

export  const NavDataAdmin = [
  {
    id:1,
    to:'/',
    icon: <BsHouse className='me-2'/>,
    name: 'Home'
  },
  {
    id:2,
    to:'/Candidates',
    icon: <BsClipboard className='me-2'/>,
    name: 'Candidates'
  },
  {
    id:3,
    to:'/BallotView',
    icon: <BsNewspaper className='me-2'/>,
    name: 'Ballot View'
  },
  {
    id:4,
    to:'/Result',
    icon: <BsClipboardCheck className='me-2'/>,
    name: 'Result'
  }
]