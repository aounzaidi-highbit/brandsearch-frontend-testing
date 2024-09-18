import React from "react";
import { ThreeCircles } from "react-loader-spinner";

const Loader = React.memo(() => {
  return (
    <div className="flex justify-center items-center min-h-28">
      <ThreeCircles
        visible={true}
        height="100"
        width="100"
        color="#287BB7"
        ariaLabel="three-circles-loading"
      />
    </div>
  );
});

export default Loader;
