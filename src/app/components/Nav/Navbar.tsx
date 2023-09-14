import React from 'react'
import { IoAddSharp, BiHomeAlt2 } from 'react-icons/fa';
export default function Navbar() {
  return (
    <div className='navbar'>
        <nav>
            <ul>
                <li>
                <IoAddSharp />
                </li>
                <li>
                <BiHomeAlt2 />
                </li>
            </ul>
        </nav>
    </div>
  )
}
