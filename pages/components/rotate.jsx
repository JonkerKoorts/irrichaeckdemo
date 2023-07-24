import React from "react";
import Lottie from "lottie-react";
import Flip from "../../public/landscape.json";

const Rotate = () => {
  return (
    <div>
      <Lottie
        className="flex justify-center content-center text-center items-center h-[80%] w-[80%] "
        animationData={Flip}
      />
    </div>
  );
};

export default Rotate;
