import dayjs from 'dayjs';
import 'dayjs/locale/it';
import { TaskInterface } from '../../../sharedInterfaces';
import Task from '../Task/Task';
import UpdateTaskModal from '../UpdateTaskModal/UpdateTaskModal';
import Loader from '../../atoms/Loader/Loader';
import './DaysTable.scss';
import { useState } from 'react';

dayjs.locale('it');

export interface DaysTableProps {
  week: number;
  tasks: TaskInterface[];
  loading: boolean;
}

const DaysTable: React.FC<DaysTableProps> = (props) => {
  
  const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false)
  const [selectedTask, setSelectedTask] = useState<TaskInterface>()
  const closeModal = () => setUpdateModalVisible(false);
  
  const updateSelectedTask = (task: TaskInterface) => {
    setSelectedTask(task);
    setUpdateModalVisible(true);
  }

  return (
    <>
      <div className="DaysTable__Days">
        {[1, 2, 3, 4, 5].map(index => {
          return (
            <div key={index}>
              <h2 className="DaysTable__DayTitle">{dayjs().week(props.week).day(index).format('dddd DD MMMM')}</h2>
              {!props.loading && props.tasks
                .filter(task => task.dayIndex === index)
                .map(task => <Task key={task.id} task={task} updateSelectedTask={updateSelectedTask} />)
              }
            </div>
          )
        })}
      </div>
      { props.loading && <Loader />}

      {selectedTask && <UpdateTaskModal task={selectedTask} isVisible={updateModalVisible} closeModal={closeModal}/>}
    </>
  )
};

export default DaysTable;
