import React from 'react'
const Skeleton: React.FC<{ className: string }> = ({ className }) => (
  <div aria-live="polite" aria-busy="true" className={className}>
    <span className="inline-flex w-full animate-pulse select-none rounded-md bg-gray-300 leading-none">
      ‌
    </span>
    <br />
  </div>
)
export default Skeleton