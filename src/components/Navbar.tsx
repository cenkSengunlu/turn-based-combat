import { useDispatch, useSelector } from "react-redux";
import { setActiveTab, selectActiveTab } from "../features/main/mainSlice";
import { TbSwords } from "react-icons/tb";
import { FiSettings } from "react-icons/fi";

const Navbar = () => {
  const dispatch = useDispatch();
  const activeTab = useSelector(selectActiveTab);

  return (
    <div className="w-full h-full bg-violet-500 flex items-center text-white rounded-t-lg">
      <button
        className={`hover:bg-violet-600 h-full w-24 text-lg rounded-tl-lg flex justify-evenly items-center ${
          activeTab === "battle" ? "bg-violet-600" : ""
        }`}
        onClick={() => dispatch(setActiveTab("battle"))}
      >
        <div>
          <TbSwords />
        </div>

        <div>Savaş</div>
      </button>
      <button
        className={`hover:bg-violet-600 h-full w-24 text-lg flex justify-evenly items-center ${
          activeTab === "settings" ? "bg-violet-600" : ""
        }`}
        onClick={() => dispatch(setActiveTab("settings"))}
      >
        <div>
          <FiSettings />
        </div>
        <div>Ayarlar</div>
      </button>
    </div>
  );
};

export default Navbar;
