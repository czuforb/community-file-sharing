import { Global } from "@emotion/react";
import React from "react";

const Fonts = () => {
  return (
    <Global
      styles={`
      @import url('https://fonts.googleapis.com/css2?family=Poppins&family=Space+Grotesk:wght@300;400;500;600;700&display=swap');      `}
    />
  );
};

export default Fonts;
