import React from "react";

import classnames from "classnames";

interface IProps {
  type: string;
  className?: string;
  onClick?: () => void;
}

const Icon: React.FC<IProps> = (props) => {
  const { type, className, ...rest } = props;
  return (
    <svg className={classnames("icon", className)} aria-hidden="true" {...rest}>
      <use xlinkHref={`#${type}`}></use>
    </svg>
  );
};

export default Icon;
