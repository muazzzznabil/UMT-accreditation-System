import React, { ReactElement } from "react";
import TabTitle from "./TabTitle";

type Props = {
  children: ReactElement[];
};

const Tabs: React.FC<Props> = ({ children }) => {
  return (
    <div>
      <ul>
        {children.map((item, index) => (
          <TabTitle key={index} title={item.props.title} />
        ))}
      </ul>
      {children}
    </div>
  );
};

export default Tabs;
