import Navbar from "./components/Navbar";
import Battle from "./features/battle/Battle";
import Settings from "./features/settings/Settings";
import { useSelector, useDispatch } from "react-redux";
import { selectActiveTab } from "./features/main/mainSlice";
import { getWarriors } from "./features/settings/settingsSlice";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  const activeTab = useSelector(selectActiveTab);

  useEffect(() => {
    dispatch(getWarriors());
  }, []);

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-zinc-300">
      <div className="h-5/6 w-3/6 bg-white rounded-lg shadow-lg">
        <div className="h-[7.5%]">
          <Navbar />
        </div>
        <div className="h-[92.5%] w-full flex justify-center items-center">
          {activeTab === "battle" ? <Battle /> : <Settings />}
        </div>
      </div>
    </div>
  );
}

export default App;
