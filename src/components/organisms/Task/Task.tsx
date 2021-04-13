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
      <div className="Task__Task">
        <Checkbox checked={props.task.done} onChange={check} />
        <div className={props.task.done ? "Task__TaskName Task__Crossed" : "Task__TaskName"} onClick={updateTask}>
          {props.task.name}
        </div>
        {props.task.length !== 0 &&
          <div className={"Task__Length " +
            (props.task.length <= 30 ?
              "Task__Length--quarter" :
              props.task.length <= 60 ?
                "Task__Length--half" :
                props.task.length <= 90 &&
                "Task__Length--halfandquarter")
          }>{props.task.length}</div>}
      </div>
    </>
  )
};

export default Task;
