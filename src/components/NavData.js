import { BsClipboard, BsClipboardCheck, BsHouse, BsNewspaper } from 'react-icons/bs'

export  const NavData = [
  {
    id:1,
    to:'/',
    icon: <BsHouse className='me-2'/>,
    name: 'Home'
  },
  {
    id:2,
    to:'/Register',
    icon: <BsClipboard className='me-2'/>,
    name: 'Register'
  },
  {
    id:3,
    to:'/Vote',
    icon: <BsNewspaper className='me-2'/>,
    name: 'Vote'
  },
  {
    id:4,
    to:'/Result',
    icon: <BsClipboardCheck className='me-2'/>,
    name: 'Result'
  }
]