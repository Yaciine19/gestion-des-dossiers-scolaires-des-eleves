import React from 'react'
import LineSkeleton from './LineSkeleton'

export default function CardSkeleton() {
  return (
    
<div className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center">
    <div className="w-full">
        <LineSkeleton width={"w-[300px]"} height={"h-3"} />
        <LineSkeleton width={"w-[700px]"} height={"h-2"} />
        <LineSkeleton width={"w-[200px]"} height={"h-2"} />
        <LineSkeleton width={"w-[200px]"} height={"h-2"} />
    </div>
</div>

  )
}
