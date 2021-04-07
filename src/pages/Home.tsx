import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { useEffect, useState } from 'react';
import Header from '../components/Header/Header';

const Home: React.FC = () => {

  dayjs.extend(weekOfYear);

  const [week, setWeek] = useState<number>(dayjs().week());
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    firebase.firestore().collection('tasks').where("year", "==", 2021).where("week", "==", week).get()
    .then(tasks => tasks.docs.map(task => console.log(task.data())))
    .finally(() => setLoading(false));
  }, [week])

  const previousWeek = () => setWeek(week - 1);
  const nextWeek = () => setWeek(week + 1);

  return (
    <>
      <Header week={week} previousWeek={previousWeek} nextWeek={nextWeek} />
      {loading && <div>Loading</div>}
    </>
  )
};

export default Home;
