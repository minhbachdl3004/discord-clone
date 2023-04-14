import React from "react";
import {
  ChildComponent,
} from "@/components/common/ProfileCard";

interface Props {
  recipient: any;
}

const UnderlineComponent = () => {
  return (
    <div className="h-[1px] bg-underline mt-[12px] mx-[12px] sticky top-0"></div>
  );
};

const UserProfile = ({ recipient }: Props) => {
  const {username, usernameCode, avatar, createdAt } = recipient;
  const date = new Date(createdAt)
  const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  return (
    <div className="flex flex-col justify-start items-center w-[340px] bg-[#292B2F] box-border">
      <div className="absolute w-[90px] h-[90px] top-[120px] right-[230px] box-border border-[5px] border-solid rounded-full border-secondary cursor-default">
        <img
          className="w-full h-full object-cover rounded-full"
          src={`${avatar}`}
          alt=""
        />
      </div>
      <div className="w-full h-[120px] mb-[60px] bg-[#E5D2CD]"></div>
      <div className="flex flex-grow w-full px-[16px] pb-[16px] box-border">
        <div className="w-full h-[200px] bg-[#18191C] rounded-[8px]">
          <div className="flex flex-col px-[12px] pt-[12px] cursor-context-menu">
            <div className="flex justify-start pr-[8px] min-h-[24px]">
              <ChildComponent
                flexPos="flex-row"
                smSize={""}
                mdSize={"20px"}
                headerText={username}
                pText={`#${usernameCode}`}
                marginBottom="6px"
                textAlign="text-left"
              />
            </div>
          </div>
          <UnderlineComponent />
          <div className="flex flex-col px-[12px] pt-[12px] cursor-context-menu">
            <div className="flex justify-start pr-[8px] min-h-[24px]">
              <ChildComponent
                flexPos="flex-col"
                smSize={""}
                mdSize={"12px"}
                headerText="DISCORD MEMBER SINCE"
                pText={formattedDate}
                marginBottom="6px"
                textAlign="text-left"
              />
            </div>
          </div>
          <UnderlineComponent />
          <div className="flex flex-col px-[12px] pt-[12px] cursor-context-menu">
            <div className="flex justify-start pr-[8px] min-h-[24px]">
              <ChildComponent
                flexPos="flex-col"
                smSize={""}
                mdSize={"12px"}
                headerText="NOTE"
                pText="Click to add a note"
                marginBottom="6px"
                textAlign="text-left"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
