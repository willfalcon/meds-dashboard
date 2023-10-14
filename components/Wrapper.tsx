import React from 'react'
import Sidebar from './Sidebar'

export default function Wrapper({children}) {
  return (
    <div className="border-t bg-background grid md:grid-cols-5 h-screen">
      <Sidebar />
      <div className="col-span-3 md:col-span-4 md:border-l h-full px-4 py-6 md:px-8 md:grid md:grid-cols-3 md:grid-flow-row auto-rows-min gap-4">
        {children}
      </div>
    </div>
  );
}
