import React from "react";

const SvgIcon = ({ id, width = 16, height = 16, className = "" }) => {
  return (
    <svg className={className} width={width} height={height}>
      <use href={`/sprite.svg#${id}`} />
    </svg>
  );
};

export default SvgIcon;
