import React from 'react'

export const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex flex-col p-4 gap-4 max-w-xl mx-auto min-h-full'>
      {children}
    </div>
  )
}
