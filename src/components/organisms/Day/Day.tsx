import React, { useCallback, useEffect, useState } from 'react';
import { Plus } from 'react-feather';
import { CreateTaskRequest, TaskInterface } from '@/sharedInterfaces';
import Button from '@components/atoms/Button/Button';
import Task from '@components/molecules/Task/Task';
import TaskLength from '@components/atoms/TaskLength/TaskLength';
import UpdateTaskModal from '@components/organisms/UpdateTaskModal/UpdateTaskModal';
import './Day.scss';
import dayjs from 'dayjs';
import 'dayjs/locale/it';

dayjs.locale('it');

export interface DayProps {
  dayNumber: number;
  year: number;
  week: number;
  tasks: TaskInterface[];
}

const Day: React.FC<DayProps> = ({
  dayNumber, year, week, tasks,
}: DayProps) => {
  const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<TaskInterface | CreateTaskRequest>();
  const [totalTime, setTotalTime] = useState<number>(0);
  const [totalRemainingTime, setTotalRemainingTime] = useState<number>(0);
  const [dayName, setDayName] = useState<string>('');

  useEffect(() => {
    setDayName(dayjs().year(year).week(week).day(dayNumber)
      .format('dddd DD MMMM'));
    setTotalTime(tasks.reduce((a, b) => a + b.length, 0));
    setTotalRemainingTime(tasks.filter((task) => !task.done).reduce((a, b) => a + b.length, 0));
  }, [tasks]);

  const updateSelectedTask = useCallback((task: TaskInterface) => {
    setSelectedTask(task);
    setUpdateModalVisible(true);
  }, []);

  const addTask = useCallback((dayIndex: number) => {
    const emptyTask = {
      name: '',
      description: '',
      dayIndex,
      done: false,
      year,
      week,
      length: 0,
    };
    setSelectedTask(emptyTask);
    setUpdateModalVisible(true);
  }, []);

  const closeUpdateModal = useCallback(() => {
    setUpdateModalVisible(false);
  }, []);

  return (
    <>
      <div className="Day__Day">
        <div className="Day__DayTitle">
          <h2>{dayName}</h2>
          <TaskLength length={totalTime} day />
          <TaskLength length={totalRemainingTime} day />
        </div>

        {tasks.map((task) => (
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

      {selectedTask && (
        <UpdateTaskModal
          task={selectedTask}
          isVisible={updateModalVisible}
          closeModal={closeUpdateModal}
        />
      )}
    </>
  );
};

export default React.memo(Day);
