import React from "react";
import NoDataImg from "../../assets/icons/nodata.svg";

const NoData = () => {
  return (
    <div className="flex flex-col  my-20 justify-center items-center mx-auto">
      <img src={NoDataImg} className="w-2/4" />
      <p className="text-[30px] mt-3">No Data Found</p>
    </div>
  );
};

export default NoData;