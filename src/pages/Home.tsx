import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import { useEffect, useRef, useState } from 'react';
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

  let firebaseSubscription = useRef(() => { })

  useEffect(() => {
    setLoading(true);
    firebaseSubscription.current = getTasksByWeek(week).onSnapshot((querySnapshot) => {
      const tasks = querySnapshot.docs.map(task => ({ id: task.id, ...task.data() })) as TaskInterface[];
      setTasks(tasks);
      setLoading(false);
    })
  }, [week])

  const previousWeek = () => {
    firebaseSubscription.current();
    setWeek(week > 1 ? week - 1 : week);
  }
  
  const nextWeek = () => {
    firebaseSubscription.current();
    setWeek(week < 52 ? week + 1 : week);
  }

  const resetWeek = () => {
    firebaseSubscription.current();
    setWeek(dayjs().week());
  }
  
  const addTask = () => setAddModalVisible(true);
  const closeModal = () => setAddModalVisible(false);

  return (
    <>
      <Header week={week} previousWeek={previousWeek} nextWeek={nextWeek} resetWeek={resetWeek} addTask={addTask} />

      <DaysTable week={week} tasks={tasks} loading={loading} />

      <AddTaskModal isVisible={addModalVisible} closeModal={closeModal}>Proviamo</AddTaskModal>
    </>
  )
};

export default Home;
