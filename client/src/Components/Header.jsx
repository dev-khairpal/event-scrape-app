import { IoTicket } from "react-icons/io5";

const Header = () => {
  return (
    <header className="text-2xl flex item-center justify-center text-white bg-slate-900 p-4 gap-4">
      <IoTicket />
      <span className="font-semibold">Event Tickets</span>
    </header>
  );
};

export default Header;
