import React from "react";
import LineSkeleton from "./LineSkeleton";

export default function CardSkeleton() {
  return (
    <div className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center">
      <div className="w-full border-2 border-gray-200 p-6 rounded-lg">
        <div className="w-full flex justify-between">
          <LineSkeleton
            width={"w-[300px]"}
            height={"h-3"}
            marginBottom={"mb-3"}
          />
          <LineSkeleton width={"w-40"} height={"h-3"} marginBottom={"mb-3"} />
        </div>
        <LineSkeleton width={"w-1/2"} height={"h-2"} marginBottom={"mb-2"} />
        <LineSkeleton
          width={"w-[200px]"}
          height={"h-2"}
          marginBottom={"mb-2"}
        />
        <LineSkeleton width={"w-[200px]"} height={"h-2"} />
      </div>
    </div>
  );
}
