import { useState } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/it';
import { CreateTaskRequest, TaskInterface } from 'sharedInterfaces';
import Loading from 'components/atoms/Loading/Loading';
import UpdateTaskModal from 'components/organisms/UpdateTaskModal/UpdateTaskModal';
import Day from 'components/organisms/Day/Day';
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
  const daysArray = [1, 2, 3, 4, 5];

  const onUpdateTask = (task: TaskInterface | CreateTaskRequest) => {
    setSelectedTask(task);
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
            <Day
              dayName={dayjs().week(week).day(index).format('dddd DD MMMM')}
              dayNumber={index}
              week={week}
              tasks={tasks.filter((task) => task.dayIndex === index)}
              updateTask={onUpdateTask}
            />
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
