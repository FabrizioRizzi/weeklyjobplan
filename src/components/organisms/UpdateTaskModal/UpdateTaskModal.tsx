
import { useEffect, useState } from 'react';
import { updateTask } from '../../../firebase/firebase';
import Modal from '../../atoms/Modal/Modal';
import TextInput from '../../atoms/TextInput/TextInput';
import TextArea from '../../atoms/TextArea/TextArea';
import './UpdateTaskModal.scss';
import Button from '../../atoms/Button/Button';
import { TaskInterface} from '../../../sharedInterfaces';

export interface AddTaskModalProps {
  isVisible: boolean;
  task: TaskInterface;
  closeModal: () => void;
};

const UpdateTaskModal: React.FC<AddTaskModalProps> = (props) => {
  const [name, setName] = useState<string>(props.task.name);
  const [dayIndex, setDayIndex] = useState<number>(props.task.dayIndex);
  const [done, setDone] = useState<boolean>(props.task.done);
  const [week, setWeek] = useState<number>(props.task.week);
  const [year, setYear] = useState<number>(props.task.year);
  const [description, setDescription] = useState<string | undefined>(props.task.description);
  const [length, setLength] = useState<number | undefined>(props.task.length);

  useEffect(() => {
    setName(props.task.name);
    setDayIndex(props.task.dayIndex);
    setDone(props.task.done);
    setWeek(props.task.week);
    setYear(props.task.year);
    setDescription(props.task.description);
    setLength(props.task.length);
  }, [props.task]);
  
  const changeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  }

  const changeDescription = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  }

  const changeDay = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDayIndex(Number(event.target.value));
  }

  const changeWeek = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWeek(Number(event.target.value));
  }

  const changeLength = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLength(Number(event.target.value));
  }

  const handleSubmit = async () => {
    setYear(2021);
    const request = {
      name, 
      dayIndex,
      done,
      week,
      year,
      ...(description ? {description} : {}),
      ...(length ? {length} : {}),

    }
    await updateTask(props.task.id, request);
    props.closeModal();
  }

  return (
    <Modal isVisible={props.isVisible} closeModal={props.closeModal} title="Aggiungi Task">
      <form>
        <div className="AddTaskModalContainer">

          <div className="Fields">

            <div>Name</div>
            <TextInput onChange={changeName} value={name} />

            <div>Description</div>
            <TextArea onChange={changeDescription} value={description} />

            <div>Day</div>
            {/* <Dropdown options={['Lunedì', 'Martedì']} onChange={changeDay}/> */}
            <TextInput onChange={changeDay} value={dayIndex} />

            <div>Week</div>
            <TextInput onChange={changeWeek} value={week}  />

            <div>Length</div>
            <TextInput onChange={changeLength} value={length} />
          </div>

          <Button primary={true} onClick={handleSubmit}>Submit</Button>

        </div>
      </form>
    </Modal>
  )
};

export default UpdateTaskModal;