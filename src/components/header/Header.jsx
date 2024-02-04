import { useState } from "react";
import "./header.css";
import HeaderLeft from "./HeaderLeft";
import Navbar from "./Navbar";
import HeaderRight from "./HeaderRight";
const Header = () => {
  const [open, setOpen] = useState(false);
  return (
    <header className="header">
      <HeaderLeft open={open} setOpen={setOpen} />
      <Navbar open={open} setOpen={setOpen} />
      <HeaderRight />
    </header>
  );
};

export default Header;
