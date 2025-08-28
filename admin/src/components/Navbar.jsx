import logo from "../assets/Hashatag_XOXO_logo_v2-remove-1_2_upscaled.png";
const Navbar = ({ setToken }) => {
  return (
    <div className="flex items-center py-2 px-[4%] justify-between">
      <span className="flex text-xs items-end font-thin">
        <img src={logo} alt="logo" className="h-12" />
        Admin
      </span>
      <button
        onClick={() => setToken("")}
        className="bg-[#212529] text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
