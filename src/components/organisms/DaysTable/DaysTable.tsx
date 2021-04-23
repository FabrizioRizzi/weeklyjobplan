import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/it';
import { Plus } from 'react-feather';
import { CreateTaskRequest, TaskInterface } from 'sharedInterfaces';
import Button from 'components/atoms/Button/Button';
import Task from 'components/molecules/Task/Task';
import UpdateTaskModal from 'components/organisms/UpdateTaskModal/UpdateTaskModal';
import Loading from 'components/atoms/Loading/Loading';
import TaskLength from 'components/atoms/TaskLength/TaskLength';
import './DaysTable.scss';

dayjs.locale('it');

export interface DaysTableProps {
  week: number;
  tasks: TaskInterface[];
  loading: boolean;
}

const DaysTable: React.FC<DaysTableProps> = ({ week, tasks, loading }: DaysTableProps) => {
  const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<TaskInterface | CreateTaskRequest>();
  const [totalTime, setTotalTime] = useState<number[]>([]);
  const daysArray = [1, 2, 3, 4, 5];

  useEffect(() => {
    // eslint-disable-next-line max-len
    setTotalTime(daysArray.map((dayIndex) => tasks.filter((task) => task.dayIndex === dayIndex).reduce((a, b) => a + b.length, 0)));
  }, [tasks]);

  const updateSelectedTask = (task: TaskInterface) => {
    setSelectedTask(task);
    setUpdateModalVisible(true);
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
    setSelectedTask(emptyTask);
    setUpdateModalVisible(true);
  };

  const closeUpdateModal = () => {
    setUpdateModalVisible(false);
  };

  return (
    <>
      <div className="DaysTable__Days">
        {!loading ? (
          daysArray.map((index) => (
            <div key={index} className="DaysTable__Day">

              <div className="DaysTable__DayTitle">
                <h2>{dayjs().week(week).day(index).format('dddd DD MMMM')}</h2>
                <div>
                  <TaskLength length={totalTime[index - 1]} day />
                </div>
              </div>

              {tasks.filter((task) => task.dayIndex === index)
                .sort((a, b) => (a.length > b.length ? 1 : -1))
                .map((task) => (
                  <Task
                    key={task.id}
                    task={task}
                    updateSelectedTask={updateSelectedTask}
                  />
                ))}

              <div className="DaysTable__AddButton">
                <Button primary onClick={() => addTask(index)}>
                  <Plus />
                </Button>
              </div>

            </div>
          ))
        ) : <Loading />}
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

export default DaysTable;
