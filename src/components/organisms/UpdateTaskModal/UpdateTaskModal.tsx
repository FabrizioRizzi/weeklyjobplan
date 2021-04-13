import { useEffect, useState } from 'react';
import { deleteTask, updateTask } from '../../../firebase/firebase';
import Modal from '../../atoms/Modal/Modal';
import TextInput from '../../atoms/TextInput/TextInput';
import TextArea from '../../atoms/TextArea/TextArea';
import './UpdateTaskModal.scss';
import Button from '../../atoms/Button/Button';
import { TaskInterface } from '../../../sharedInterfaces';

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
  const [description, setDescription] = useState<string>(props.task.description || '');
  const [length, setLength] = useState<number>(props.task.length || 0);

  useEffect(() => {
    setName(props.task.name);
    setDayIndex(props.task.dayIndex);
    setDone(props.task.done);
    setWeek(props.task.week);
    setYear(props.task.year);
    setDescription(props.task.description || '');
    setLength(props.task.length || 0);
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
      description,
      length
    }
    await updateTask(props.task.id, request);
    props.closeModal();
  }

  const deleteSelectedTask = () => {
    deleteTask(props.task.id);
  }

  return (
    <Modal isVisible={props.isVisible} closeModal={props.closeModal} title="Aggiungi Task" width={400}>
      <form>
        <div className="UpdateTaskModal__Fields">

          <div>Name</div>
          <TextInput onChange={changeName} value={name} />

          <div>Description</div>
          <TextArea onChange={changeDescription} value={description} />

          <div>Day</div>
          {/* <Dropdown options={['Lunedì', 'Martedì']} onChange={changeDay}/> */}
          <TextInput onChange={changeDay} value={dayIndex} type="number" />

          <div>Week</div>
          <TextInput onChange={changeWeek} value={week} type="number" />

          <div>Length</div>
          <TextInput onChange={changeLength} value={length} type="number" />
        </div>

        <div className="UpdateTaskModal__Buttons">
          <Button primary={false} onClick={deleteSelectedTask}>Cancella</Button>
          <Button primary={true} onClick={handleSubmit}>Aggiorna</Button>
        </div>
      </form>
    </Modal>
  )
};

export default UpdateTaskModal;
