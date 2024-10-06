"use client"
import React from 'react';
import { SubmitData } from '@/app/types/Types'
import Result from './Result/Result'
import LoadingSkeleton from './Result/Skeleton';

export default function Results({ posts = [] }: { posts: SubmitData[] }) {
  console.log('posts', posts)
  return (
    <div className='results mt-4'>
      {posts.length === 0 && <LoadingSkeleton />}
      <ul className='pubs'>
        {posts.length > 0 && posts.map((pub: SubmitData) => {
          const { borough, drink, price, full_address, address, name, _id, date } = pub
          return (
            <Result
              key={_id}
              name={name}
              full_address={full_address}
              address={address}
              price={price}
              drink={drink}
              borough={borough}
              date={date}
            />
          )
        })}
      </ul>
    </div>
  )
}
