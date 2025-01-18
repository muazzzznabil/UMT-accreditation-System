import React from "react";

type Props = {
  title: string;
};

const TabTitle: React.FC<Props> = ({ title }) => {
  return (
    <li>
      <button>{title}</button>
    </li>
  );
};

export default TabTitle;
