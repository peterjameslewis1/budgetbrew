"use client"
import React from 'react'
import Image from 'next/image'
import beer from '../../../../public//beer.png'
export default function Header() {
  return (
    <header>  
        <h1>BudgetBrews</h1>
        <Image 
        height="50"
        width="50"
        src={beer}
        alt="beer"
        />
    </header>
  )
}
