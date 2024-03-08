import React from 'react'
import { SearchBox } from '@mapbox/search-js-react'

type SearchBoxProps = {
    accessToken: string;
    options: {
        language: string;
        country: string,
        poi_category: string,
        limit: number,
    }
    value: string,
    onChange: () => void
    onRetrieve: (res: any) => void,
    placeholder: string
}
export default function SearchBoxInput({ accessToken, options, value, onChange, onRetrieve, placeholder }:SearchBoxProps) {
  return (
    <>
    {/* @ts-expect-error Server Component */}
    <SearchBox 
        accessToken={accessToken}
        options={options}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onRetrieve={onRetrieve}
        />
    </>
  )
}
