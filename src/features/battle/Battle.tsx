import { useSelector } from "react-redux";
import WarriorSelection from "../../components/WarriorSelection";
import { selectWarriors } from "../settings/settingsSlice";
import {
  selectIsBattle,
  selectStartBattleStatus,
  selectSelectedWarrior,
  selectOpponent,
  selectIsYourTurn,
  selectTurn,
  selectWinner,
} from "../battle/battleSlice";
import WarriorCard from "../../components/WarriorCard";

const Battle = () => {
  const warriors = useSelector(selectWarriors);
  const isBattle = useSelector(selectIsBattle);
  const startBattleStatus = useSelector(selectStartBattleStatus);
  const selected_warrior = useSelector(selectSelectedWarrior);
  const opponent = useSelector(selectOpponent);
  const isYourTurn = useSelector(selectIsYourTurn);
  const turn = useSelector(selectTurn);
  const winner = useSelector(selectWinner);
  return (
    <>
      <div className="h-full w-full flex items-center flex-col pt-12">
        <>
          {warriors.length === 0 ? (
            <div className="text-center text-2xl">
              Herhangi bir savaşçı bulunmamaktadır.
              <br />
              Önce ayarlardan savaşçı ekleyiniz.
            </div>
          ) : (
            <WarriorSelection />
          )}
        </>

        <>
          {startBattleStatus === "succeeded" && (
            <>
              <div className="mt-9 text-2xl">TUR: {turn}</div>
              <div className="mt-5 w-full grid grid-cols-3 gap-3">
                <div className="w-full flex justify-center">
                  <WarriorCard
                    warrior={selected_warrior}
                    isOpponent={false}
                    isYourTurn={isYourTurn}
                  />
                </div>
                <div className="text-5xl w-full flex justify-center items-center">
                  VS
                </div>
                <div className="w-full flex justify-center">
                  <WarriorCard
                    warrior={opponent}
                    isOpponent={true}
                    isYourTurn={!isYourTurn}
                  />
                </div>
              </div>
              {winner !== "" && (
                <div className="w-full flex justify-center items-center h-full">
                  <div className="bg-green-500 border-4 border-green-600 text-white rounded-lg py-4 px-6">
                    <div className="text-3xl flex items-start">
                      Kazanan: {winner}
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </>
      </div>
    </>
  );
};

export default Battle;
