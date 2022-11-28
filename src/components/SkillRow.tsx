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
  removeSkill,
} from "../features/settings/settingsSlice";
import DeleteModal from "./DeleteModal";
import { Skill } from "../app/types";
import { useCallback, useState } from "react";

const SkillRow = ({ skill, index }: { skill: Skill; index: number }) => {
  const warriors = useSelector(selectWarriors);
  const [, updateState] = useState<any>();
  const forceUpdate = useCallback(() => updateState({}), []);
  const warrior = warriors.find((war) => war.id === skill.warrior_id);
  const dispatch = useDispatch();
  const otherSkills = warrior?.skills.slice(0);
  otherSkills?.splice(index, 1);
  const handleSave = () => {
    dispatch(addSkill({ skill }));
  };
  const { isOpen, onOpen, onClose } = useDisclosure();
  const canSave = [
    skill.skill_type !== 0,
    skill.skill_type_option !== 0,
    skill.point >= 4 && skill.point <= 20,
    !skill.id,
  ].every(Boolean);

  const disableState = (option: number) => {
    return (
      warrior?.skills.filter(
        (skill2: Skill) => skill2.skill_type_option === option
      ).length === 2 ||
      otherSkills?.filter(
        (otherSkill: Skill) =>
          otherSkill.skill_type === skill.skill_type &&
          otherSkill.skill_type_option === option
      ).length === 1
    );
  };

  const disableSelect = (option: number) => {
    return (
      warrior?.skills.filter((skill2: Skill) => skill2.skill_type === option)
        .length === 2 ||
      otherSkills?.filter(
        (otherSkill: Skill) =>
          otherSkill.skill_type_option === skill.skill_type_option &&
          otherSkill.skill_type === option
      ).length === 2
    );
  };

  const handleDelete = (skill: Skill, skill_index: number) => {
    if (!skill.id) {
      console.log({ index, skill_index });
      if (warrior) {
        const new_skills = warrior.skills.slice(0);
        new_skills.splice(skill_index, 1);
        dispatch(removeSkill({ ...warrior, skills: new_skills }));
      }
    } else {
      onOpen();
    }
  };

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
          <option value="1" disabled={disableSelect(1)}>
            Atak
          </option>
          <option value="2" disabled={disableSelect(2)}>
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
          <option value="1" disabled={disableState(1)}>
            Kısa Mesafe
          </option>
          <option value="2" disabled={disableState(2)}>
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
          onClick={() => handleSave()}
        >
          Kaydet
        </button>
        <button
          className="w-full bg-red-500 border-2 border-red-600 text-white rounded-lg"
          onClick={() => handleDelete(skill, index)}
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
