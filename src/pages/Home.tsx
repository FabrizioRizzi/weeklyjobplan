import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import { useEffect, useState } from 'react';
import Header from '../components/organisms/Header/Header';
import DaysTable from '../components/organisms/DaysTable/DaysTable';
import { TaskInterface } from '../sharedInterfaces';
import { getTasksByWeek } from '../firebase/firebase';
import AddTaskModal from '../components/organisms/AddTaskModal/AddTaskModal';

dayjs.extend(weekOfYear);

const Home: React.FC = () => {
  const [week, setWeek] = useState<number>(dayjs().week());
  const [loading, setLoading] = useState<boolean>(false);
  const [tasks, setTasks] = useState<TaskInterface[]>([])
  const [addModalVisible, setAddModalVisible] = useState<boolean>(false)

  useEffect(() => {
     const getTasks = async () => {
      setLoading(true);
       try {
        setTasks(await getTasksByWeek(week) as TaskInterface[]);
       } finally {
        setLoading(false);
       }
     }
     getTasks();
  }, [week])

  const previousWeek = () => setWeek(week > 1 ? week - 1 : week);
  const nextWeek = () => setWeek(week < 52 ? week + 1 : week);
  const resetWeek = () => setWeek(dayjs().week());
  const addTask = () => setAddModalVisible(true);
  const closeModal = () => setAddModalVisible(false);

  return (
    <>
      <Header week={week} previousWeek={previousWeek} nextWeek={nextWeek} resetWeek={resetWeek} addTask={addTask}/>

      <DaysTable week={week} tasks={tasks} loading={loading}/>
      
      <AddTaskModal isVisible={addModalVisible} closeModal={closeModal}>Proviamo</AddTaskModal>
    </>
  )
};

export default Home;
