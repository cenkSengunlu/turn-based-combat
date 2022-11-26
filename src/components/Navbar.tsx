import { useDispatch, useSelector } from "react-redux";
import { setActiveTab, selectActiveTab } from "../features/main/mainSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const activeTab = useSelector(selectActiveTab);

  return (
    <div className="w-full h-full bg-violet-500 flex items-center text-white rounded-t-lg">
      <button
        className={`hover:bg-violet-600 h-full px-4 text-lg rounded-tl-lg ${
          activeTab === "battle" ? "bg-violet-600" : ""
        }`}
        onClick={() => dispatch(setActiveTab("battle"))}
      >
        Savaş
      </button>
      <button
        className={`hover:bg-violet-600 h-full px-4 text-lg ${
          activeTab === "settings" ? "bg-violet-600" : ""
        }`}
        onClick={() => dispatch(setActiveTab("settings"))}
      >
        Ayarlar
      </button>
    </div>
  );
};

export default Navbar;
