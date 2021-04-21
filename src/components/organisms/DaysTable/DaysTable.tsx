import { useState } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/it';
import { Plus } from 'react-feather';
import { CreateTaskRequest, TaskInterface } from 'sharedInterfaces';
import Button from 'components/atoms/Button/Button';
import Task from 'components/organisms/Task/Task';
import UpdateTaskModal from 'components/organisms/UpdateTaskModal/UpdateTaskModal';
import Loading from 'components/atoms/Loading/Loading';
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
          [1, 2, 3, 4, 5].map((index) => (
            <div key={index} className="DaysTable__Day">

              <h2 className="DaysTable__DayTitle">{dayjs().week(week).day(index).format('dddd DD MMMM')}</h2>

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
