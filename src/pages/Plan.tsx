import { useEffect, useState } from 'react';
import { getTasksToPlan } from 'firebaseUtils/firebase';
import { TaskToPlan } from 'sharedInterfaces';
import Loading from 'components/atoms/Loading/Loading';

const Plan: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [tasksToPlan, setTasksToPlan] = useState<TaskToPlan[]>([]);

  useEffect(() => {
    setLoading(true);
    const firebaseSubscription = getTasksToPlan().onSnapshot((querySnap) => {
      const tasks = querySnap.docs.map((task) => ({ id: task.id, ...task.data() }));
      setTasksToPlan(tasks as unknown as TaskToPlan[]);
      setLoading(false);
    });
    return () => firebaseSubscription();
  }, []);

  return (
    <div>
      {loading
        ? <Loading />
        : <div>{tasksToPlan[0].name}</div>}
    </div>
  );
};

export default Plan;
