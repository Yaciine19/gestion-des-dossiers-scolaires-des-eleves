import React from "react";

export default function LineSkeleton({width, height, marginBottom}) {
  return (
    <div role="status" className="animate-pulse">
      <div className={`bg-gray-200 rounded-full ${width} ${height ? height : 'h-2'} ${marginBottom}`} />
      <span className="sr-only">Loading...</span>
    </div>
  );
}
