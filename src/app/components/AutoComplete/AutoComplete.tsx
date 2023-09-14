"use client"
import React, { useState } from 'react'
import { SearchBox } from '@mapbox/search-js-react';

export default function AutoComplete({ accessToken }: { accessToken: string }) {
    const [value, setValue] = useState('');
    return (
      <form>
        <SearchBox 
            accessToken={accessToken}
            options={{
                language: 'en',
                country: 'GB',
                poi_category: ["pub", "bar"]
            }}
            placeholder="Search..."
            value={value}
            onChange={setValue}
        />
      </form>
    );
  }