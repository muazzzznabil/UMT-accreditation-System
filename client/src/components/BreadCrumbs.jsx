import React from 'react'
import  {Breadcrumbs}  from "@material-tailwind/react";
import { Link } from 'react-router-dom'

const BreadcrumbsWithIcon = ({items}) => {
  return (
    <Breadcrumbs >
<h1 className='text-6xl'>Test Breadcrumbs</h1>

     {items.map((item, index) => (
      <Link key={index} to={item.path} className={item.isActive ? '' : 'opacity-60'}>
         {item.icon && <item.icon className="h-4 w-4 inline-block mr-1" />}
         {item.label}
       </Link>
   ))}
   </Breadcrumbs>
  )
}

export default BreadcrumbsWithIcon; // Default export
