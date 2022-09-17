import React from "react";

interface IProps {
  type: string;
}

const Icon: React.FC<IProps> = (props) => {
  const { type } = props;
  return (
    <svg className="icon" aria-hidden="true">
      <use xlinkHref={`#${type}`}></use>
    </svg>
  );
};

export default Icon;
