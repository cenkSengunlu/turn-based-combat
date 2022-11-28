import {
  NumberInput,
  NumberInputField,
  Select,
  useDisclosure,
} from "@chakra-ui/react";
import justNumber from "../functions/justNumber";
import { useDispatch, useSelector } from "react-redux";
import {
  addSkill,
  updateSkill,
  selectWarriors,
} from "../features/settings/settingsSlice";
import DeleteModal from "./DeleteModal";

const SkillRow = ({ skill, index }: any) => {
  const warriors = useSelector(selectWarriors);
  const warrior = warriors.find((war) => war.id === skill.warrior_id);
  const dispatch = useDispatch();

  const handleSave = () => {
    dispatch(addSkill({ skill }));
  };
  const { isOpen, onOpen, onClose } = useDisclosure();
  const canSave = [
    skill.skill_type !== 0,
    skill.skill_type_option !== 0,
    skill.point >= 4 && skill.point <= 20,
  ].every(Boolean);

  return (
    <>
      <div>
        <Select
          placeholder="Seçiniz..."
          defaultValue={skill.skill_type}
          className="w-full"
          onChange={(e) =>
            dispatch(
              updateSkill(
                skill.warrior_id,
                { skill_type: Number(e.target.value) },
                index
              )
            )
          }
        >
          <option
            value="1"
            disabled={
              warrior?.skills.filter((skill: any) => skill.skill_type === 1)
                .length === 2
            }
          >
            Atak
          </option>
          <option
            value="2"
            disabled={
              warrior?.skills.filter((skill: any) => skill.skill_type === 2)
                .length === 2
            }
          >
            Defans
          </option>
        </Select>
      </div>
      <div>
        <Select
          placeholder="Seçiniz..."
          defaultValue={skill.skill_type_option}
          className="w-full"
          onChange={(e) =>
            dispatch(
              updateSkill(
                skill.warrior_id,
                { skill_type_option: Number(e.target.value) },
                index
              )
            )
          }
        >
          <option
            value="1"
            disabled={
              warrior?.skills.filter(
                (skill: any) => skill.skill_type_option === 1
              ).length === 2
            }
          >
            Kısa Mesafe
          </option>
          <option
            value="2"
            disabled={
              warrior?.skills.filter(
                (skill: any) => skill.skill_type_option === 2
              ).length === 2
            }
          >
            Uzun Mesafe
          </option>
        </Select>
      </div>
      <div>
        <NumberInput value={skill.point}>
          <NumberInputField
            onChange={(e) =>
              dispatch(
                updateSkill(
                  skill.warrior_id,
                  { point: Number(e.target.value) },
                  index
                )
              )
            }
            onKeyPress={(event) => justNumber(event)}
            placeholder="4 - 20"
          />
        </NumberInput>
      </div>

      <div className="w-full grid grid-cols-2 gap-2">
        <button
          className="w-full bg-green-500 border-2 border-green-600 rounded-lg disabled:cursor-not-allowed disabled:opacity-50"
          disabled={!canSave}
          onClick={handleSave}
        >
          Kaydet
        </button>
        <button
          className="w-full bg-red-500 border-2 border-red-600 text-white rounded-lg"
          onClick={onOpen}
        >
          Sil
        </button>
        {isOpen && (
          <DeleteModal
            isOpen={isOpen}
            onClose={onClose}
            id={skill.id}
            delete_option="delete_skill"
          />
        )}
      </div>
    </>
  );
};

export default SkillRow;
