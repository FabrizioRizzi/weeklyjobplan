import { List, SkipForward } from 'react-feather';
import { updateDoneTask, updateTask } from 'firebaseUtils/firebase';
import { TaskInterface } from 'sharedInterfaces';
import Checkbox from 'components/atoms/Checkbox/Checkbox';
import './Task.scss';

export interface TaskProps {
  task: TaskInterface;
  updateSelectedTask: (task: TaskInterface) => void;
}

const Task: React.FC<TaskProps> = ({ task, updateSelectedTask }: TaskProps) => {
  const check = (checked: boolean) => {
    updateDoneTask(task.id, checked);
  };

  const updateTaskModal = () => {
    updateSelectedTask(task);
  };

  const postpone = async () => {
    const request = {
      name: task.name,
      dayIndex: task.dayIndex < 5 ? task.dayIndex + 1 : 1,
      done: task.done,
      week: task.dayIndex < 5 ? task.week : task.week + 1,
      year: task.year,
      description: task.description,
      length: task.length,
    };
    await updateTask(task.id, request);
  };

  return (
    <>
      <div className="Task__Task">
        <Checkbox checked={task.done} onChange={check} />
        <div className={`Task__TaskName ${task.done && 'Task__Crossed'}`} onClick={updateTaskModal}>
          {task.name}
        </div>
        <div>
          {task.description && (<div className="Task__TaskDescription" data-description={task.description}><List /></div>)}
        </div>
        <div>
          {task.length !== 0
            && (
              <div className={
                `Task__Length
              ${task.length <= 30 && 'Task__Length--quarter'}
              ${(task.length > 30 && task.length <= 60) && 'Task__Length--half'}
              ${(task.length > 60 && task.length <= 90) && 'Task__Length--halfandquarter'}`
              }
              >
                {task.length}
              </div>
            )}
        </div>
        <div>
          <div className="Task__Postpone" onClick={postpone}><SkipForward /></div>
        </div>
      </div>
    </>
  );
};

export default Task;
