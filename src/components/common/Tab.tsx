import React from 'react'
type Tab = {
  id: number;
  name: string;
  styles?: string;
  activeTab?: string;
  notActiveTab?: string;
  isActive: boolean;
};

type Props = {
  tabs: Tab[];
  handleChange: (index: number) => void;
};

const Tabs = ({ tabs, handleChange }: Props) => {
  return (
    <>
      {tabs.map((tab, index) => (
        <div
          role="tab"
          key={index}
          className={`flex justify-center items-center text-center min-w-[40px] rounded-[4px] mx-[8px] py-[2px] px-[8px] cursor-pointer ${
            tab.isActive ? tab.activeTab : tab.notActiveTab
          }`}
          onClick={() => handleChange(index)}
        >
          {tab.name}
        </div>
      ))}
    </>
  );
};

export default Tabs;
