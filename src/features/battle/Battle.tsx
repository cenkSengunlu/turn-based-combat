import { useSelector } from "react-redux";
import WarriorSelection from "../../components/WarriorSelection";
import { selectWarriors } from "../settings/settingsSlice";

const Battle = () => {
  const warriors = useSelector(selectWarriors);
  return (
    <>
      <div className="h-full w-full flex justify-center pt-12">
        {warriors.length === 0 ? (
          <div className="text-center text-2xl">
            Herhangi bir savaşçı bulunmamaktadır.
            <br />
            Önce ayarlardan savaşçı ekleyiniz.
          </div>
        ) : (
          <WarriorSelection />
        )}
      </div>
    </>
  );
};

export default Battle;
