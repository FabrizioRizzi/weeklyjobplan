import { useEffect, useState } from 'react';
import { Plus } from 'react-feather';
import { CreateTaskRequest, TaskInterface } from 'sharedInterfaces';
import Button from 'components/atoms/Button/Button';
import Task from 'components/molecules/Task/Task';
import TaskLength from 'components/atoms/TaskLength/TaskLength';
import './Day.scss';

export interface DayProps {
  dayName: string;
  dayNumber: number;
  week: number;
  tasks: TaskInterface[];
  updateTask: (task: TaskInterface | CreateTaskRequest) => void;
}

const Day: React.FC<DayProps> = ({
  dayName, dayNumber, week, tasks, updateTask,
}: DayProps) => {
  const [totalTime, setTotalTime] = useState<number>(0);
  const [totalRemainingTime, setTotalRemainingTime] = useState<number>(0);

  useEffect(() => {
    setTotalTime(tasks.reduce((a, b) => a + b.length, 0));
    setTotalRemainingTime(tasks.filter((task) => !task.done).reduce((a, b) => a + b.length, 0));
  }, [tasks]);

  const updateSelectedTask = (task: TaskInterface) => {
    updateTask(task);
  };

  const addTask = (dayIndex: number) => {
    const emptyTask = {
      name: '',
      description: '',
      dayIndex,
      done: false,
      week,
      year: 2021,
      length: 0,
    };
    updateTask(emptyTask);
  };

  return (
    <div className="Day__Day">
      <div className="Day__DayTitle">
        <h2>{dayName}</h2>
        <TaskLength length={totalTime} day />
        <TaskLength length={totalRemainingTime} day />
      </div>

      {tasks.sort((a, b) => (a.length > b.length ? 1 : -1))
        .map((task) => (
          <Task
            key={task.id}
            task={task}
            updateSelectedTask={updateSelectedTask}
          />
        ))}

      <div className="Day__AddButton">
        <Button primary onClick={() => addTask(dayNumber)}>
          <Plus />
        </Button>
      </div>
    </div>
  );
};

export default Day;
