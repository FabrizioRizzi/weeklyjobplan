/* eslint-disable no-nested-ternary */
import { AlertOctagon } from 'react-feather';
import { TaskToPlanInterface } from 'sharedInterfaces';
import './TaskToPlan.scss';

export interface TaskToPlanProps {
  taskToPlan: TaskToPlanInterface;
  updateSelectedTaskToPlan: (taskToPlan: TaskToPlanInterface) => void;
}

const TaskToPlan: React.FC<TaskToPlanProps> = ({
  taskToPlan, updateSelectedTaskToPlan,
}: TaskToPlanProps) => {
  const onUpdateSelectedTask = () => {
    updateSelectedTaskToPlan(taskToPlan);
  };

  return (
    <div key={taskToPlan.id} className="TaskToPlan__Item" onClick={onUpdateSelectedTask}>
      <div className="TaskToPlan__Title">{taskToPlan.name}</div>
      <div><AlertOctagon color={taskToPlan.priority === 2 ? '#ff0000' : taskToPlan.priority === 1 ? '#ffb100' : '#d4d4d4'} /></div>
      {taskToPlan.description && (
      <div className="TaskToPlan__Description">
        {taskToPlan.description}
      </div>
      )}
    </div>
  );
};

export default TaskToPlan;
