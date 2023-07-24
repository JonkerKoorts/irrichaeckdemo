import React from "react";
import Lottie from "lottie-react";
import Waterflow from "../../public/waterload.json";

const Loading = () => {
  return (
    <div>
      <Lottie
        className="flex justify-center content-center items-center h-screen w-screen "
        animationData={Waterflow}
      />
    </div>
  );
};

export default Loading;
