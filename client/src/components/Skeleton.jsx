import React from "react";

const Skeleton = () => {
  return (
    <div className="bg-white h-screen w-full flex justify-center items-center">
      <div className="h-full md:h-[85%] w-full md:w-[95%] lg:w-[85%] 
      backdrop-blur-xl md:border-2 md:border-gray-600 
      md:rounded-2xl grid grid-cols-1 md:grid-cols-4 overflow-hidden">

        {/* Left Sidebar Skeleton */}
        <div className="col-span-1 md:col-span-1 bg-[#8185B2]/10 p-4 flex flex-col gap-4">

          {/* Logo */}
          <div className="h-8 w-24 bg-gray-600 rounded animate-pulse"></div>

          {/* Search */}
          <div className="h-10 w-full bg-gray-700 rounded-3xl animate-pulse"></div>

          {/* Users List */}
          <div className="flex flex-col gap-3 mt-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="h-10 w-10 bg-gray-600 rounded-full animate-pulse"></div>
                <div className="flex flex-col gap-2 w-full">
                  <div className="h-3 w-24 bg-gray-600 rounded animate-pulse"></div>
                  <div className="h-2 w-16 bg-gray-700 rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Skeleton */}
        <div className="hidden md:flex col-span-2 flex-col justify-between">

          {/* Chat Header */}
          <div className="flex items-center gap-3 border-b border-gray-600 pb-3">
            <div className="h-12 w-12 bg-gray-600 rounded-full animate-pulse"></div>
            <div className="flex flex-col gap-2">
              <div className="h-4 w-32 bg-gray-600 rounded animate-pulse"></div>
              <div className="h-3 w-20 bg-gray-700 rounded animate-pulse"></div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex flex-col gap-4 mt-4 flex-1">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`h-10 animate-pulse ${i % 2 === 0
                  ? "w-2/3 bg-gray-700 rounded-xl"
                  : "w-1/2 bg-gray-600 rounded-xl self-end"
                  }`}
              ></div>
            ))}
          </div>

          {/* Input */}
          <div className="h-12 w-full bg-gray-700 rounded-full mt-4 animate-pulse"></div>
        </div>

        {/* Right Sidebar Skeleton */}
        <div className="hidden md:flex col-span-1 bg-gray-600/40 p-4 flex-col items-center gap-4">
          <div className="h-20 w-20 bg-gray-600 rounded-full animate-pulse"></div>
          <div className="h-4 w-32 bg-gray-600 rounded animate-pulse"></div>
          <div className="h-3 w-40 bg-gray-700 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default Skeleton;