import { Link, useNavigate } from "react-router-dom";
import Item from "@/components/common/Item";

interface Props {
  id: number;
  name: string;
  isSelected: boolean;
  icon?: any;
}

const Chat = ({ id, name, icon, isSelected }: Props) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/chat/${id}`);
  };
  
  return (
    <div
      className={`mb-[2px] relative w-full ${
        isSelected ? "bg-focusColor hover:bg-secondary" : "bg-primary"
      } hover:bg-focusHover rounded-[4px]`}
      role="button"
      key={id}
    >
      <Item
        icon={icon}
        name={name}
        isSelected={isSelected}
        link={`/channels/@me/${id}`}
      />
    </div>
  );
};

export default Chat;
