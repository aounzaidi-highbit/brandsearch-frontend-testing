import React, { useEffect, useState } from "react";

const ListLoader = React.memo(() => {
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

const CardLoader = React.memo(() => {

  const [visibleProfiles, setVisibleProfiles] = useState(8);

  const updateVisibleProfiles = () => {
    const width = window.innerWidth;
    if (width < 640) {
      setVisibleProfiles(3);
    } else {
      setVisibleProfiles(6);
    }
  };

  useEffect(() => {
    updateVisibleProfiles();
    window.addEventListener("resize", updateVisibleProfiles);

    return () => {
      window.removeEventListener("resize", updateVisibleProfiles);
    };
  }, []);

  const legnth = [...Array(6)];
  return (
    <div className="mx-8 sm:mx-0 gap-x-8 gap-y-6 xl:gap-x-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 h-[63vh]">
      {legnth.slice(0, visibleProfiles).map((i) => (
        <div key={i} className="bg-white rounded-3xl flex flex-col px-5 shadow-box-shadow h-auto">
          <div>
            <div className="mt-3 flex items-center border-none justify-center">
              <img
                className="w-[80px] h-[80px] border-none rounded-full bg-shimmer animate-shimmer"
              />
            </div>
            <div className="pt-16 p-4 -mt-[50px] rounded-2xl bg-shimmer bg-shimmer-size animate-shimmer mb-5 h-3/6">
            </div>
            <div className="flex flex-col gap-2">
              <p className="bg-shimmer animate-shimmer h-3 w-4/12"></p>
              <p className="bg-shimmer animate-shimmer h-4 w-3/12"></p>
              <p className="bg-shimmer animate-shimmer h-2"></p>
              <p className="bg-shimmer animate-shimmer h-2"></p>
              <p className="bg-shimmer animate-shimmer h-2 w-6/12"></p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
});

export { ListLoader, CardLoader };
