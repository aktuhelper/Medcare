import React, { Children } from 'react'
import CategoryList from './_components/CategoryList'

const layout = ({children,params}) => {
  return (
    <div className='grid grid-cols-4'>
      <div className='hidden md:block'>
        {/* category*/}
        <CategoryList category={params.cname}/>
      </div>
      <div className='col-span-4 md:col-span-3'>
      {children}
      </div>
    
    </div>
  )
}

export default layout
