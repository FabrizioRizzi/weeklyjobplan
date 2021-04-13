import { updateDoneTask } from '../../../firebase/firebase';
import { TaskInterface } from '../../../sharedInterfaces';
import Checkbox from '../../atoms/Checkbox/Checkbox';
import './Task.scss';

export interface TaskProps {
  task: TaskInterface;
  updateSelectedTask: (task: TaskInterface) => void;
};

const Task: React.FC<TaskProps> = (props) => {

  const check = (checked: boolean) => {
    updateDoneTask(props.task.id, checked)
  }

  const updateTask = () => {
    props.updateSelectedTask(props.task);
  }

  return (
    <>
      <div className="Task">
        <Checkbox checked={props.task.done} onChange={check} />
        <div className={props.task.done ? "TaskName Crossed" : "TaskName"} onClick={updateTask}>
          {props.task.name}
        </div>
        {props.task.length !== 0 && <div className="Length">{props.task.length}</div>}
      </div>
    </>
  )
};

export default Task;
