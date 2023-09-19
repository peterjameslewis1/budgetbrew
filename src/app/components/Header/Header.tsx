"use client"
import React from 'react'
import Image from 'next/image'
export default function Header() {
  return (
    <header>  
        <h1>BudgetBrews</h1>
        <Image 
        height="50"
        width="50"
        src={"https://img.icons8.com/plasticine/100/beer.png"}
        alt="beer"
        />
    </header>
  )
}
