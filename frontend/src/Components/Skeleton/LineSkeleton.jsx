import React from "react";

export default function LineSkeleton({width, marginBottom}) {
  return (
    <div role="status" className="max-w-sm animate-pulse">
      <div className={`h-2 bg-gray-200 rounded-full ${width} ${marginBottom}`} />
      <span className="sr-only">Loading...</span>
    </div>
  );
}
