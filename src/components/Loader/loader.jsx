import React from "react";

const Loader = React.memo(() => {
  const legnth = [...Array(10)];
  return (
    legnth.map((i) => (
      <div key={i} className="mb-6">
        <div className="w-full flex items-center shadow-box-shadow px-5 rounded-lg py-8">
          <div className="w-[115px] h-[108px] rounded-full bg-shimmer bg-shimmer-size animate-shimmer"></div>
          <div className="w-[85%] flex flex-col gap-2 px-5">
            <div className="h-4 w-[30%] bg-shimmer bg-shimmer-size animate-shimmer rounded"></div>
            <div className="my-1 space-y-2">
              <div className="h-2 w-[27%] bg-shimmer bg-shimmer-size animate-shimmer rounded"></div>
              <div className="h-2 w-[22%] bg-shimmer bg-shimmer-size animate-shimmer rounded"></div>
            </div>
            <div className="h-3 w-[90%] bg-shimmer bg-shimmer-size animate-shimmer rounded"></div>
            <div className="h-3 w-[90%] bg-shimmer bg-shimmer-size animate-shimmer rounded"></div>
            <div className="h-3 w-[60%] bg-shimmer bg-shimmer-size animate-shimmer rounded"></div>
          </div>
          <div className="h-10 bg-gray-200 bg-shimmer bg-shimmer-size animate-shimmer w-[120px] rounded-3xl"></div>
        </div>
      </div>
    ))
  );
});

export default Loader;
