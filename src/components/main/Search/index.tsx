import "./styles.scss";

const Search = () => {
  return (
    <div className="h-[50px] px-[10px] flex items-center border-solid border-x-0 border-t-0 border-b-[1px] border-borderColor">
      <button
        className="w-full h-[30px] overflow-hidden rounded-md bg-black text-[#A3A6AA] shadow-none text-ellipsis text-left text-xl font-medium leading-6 whitespace-nowrap cursor-pointer outline-none border-none"
        type="button"
      >
        Find or start a conversation
      </button>
    </div>
  );
};

export default Search;
