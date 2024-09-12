import React, { useEffect, useState } from 'react';
import { Plus } from 'react-feather';
import { getTasksToPlan } from '@firebaseUtils/firebase';
import { CreateTaskToPlanRequest, TaskToPlanInterface } from '@/sharedInterfaces';
import Loading from '@components/atoms/Loading/Loading';
import Button from '@components/atoms/Button/Button';
import UpdateToPlanModal from '@components/organisms/UpdateToPlanModal/UpdateToPlanModal';
import './ToPlan.scss';
import { onSnapshot } from 'firebase/firestore';
import TaskToPlan from '../../molecules/TaskToPlan/TaskToPlan';

const ToPlan: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [tasksToPlan, setTasksToPlan] = useState<TaskToPlanInterface[]>([]);
  const [toPlanVisible, setToPlanVisible] = useState<boolean>(false);
  const [toPlanModalVisible, setToPlanModalVisible] = useState<boolean>(false);
  const [selTaskToPlan, setSelTaskToPlan] = useState<TaskToPlanInterface | CreateTaskToPlanRequest>(
    {
      name: '',
      description: '',
      priority: 0 as 0 | 1 | 2,
    },
  );

  useEffect(() => {
    setLoading(true);

    const getTasksToPlanSubscription = onSnapshot(getTasksToPlan(), (querySnapshot) => {
      const tasks = querySnapshot.docs.map((task) => (
        { id: task.id, ...task.data() }
      )) as TaskToPlanInterface[];
      setTasksToPlan(tasks);
      setLoading(false);
    });

    return () => getTasksToPlanSubscription();
  }, []);

  const toggleToPlan = () => {
    setToPlanVisible(!toPlanVisible);
  };

  const updateSelectedTaskToPlan = (task: TaskToPlanInterface) => {
    setSelTaskToPlan(task);
    setToPlanModalVisible(true);
  };

  const addTaskToPlan = () => {
    const emptyTask = {
      name: '',
      description: '',
      priority: 0 as 0 | 1 | 2,
    };
    setSelTaskToPlan(emptyTask);
    setToPlanModalVisible(true);
  };

  const closeUpdateModal = () => {
    setToPlanModalVisible(false);
  };

  return (
    <>
      <div className={toPlanVisible ? 'ToPlan__ToPlanOpen' : 'ToPlan__ToPlan'}>
        <div className="ToPlan__Title" onClick={toggleToPlan}>To Plan</div>
        <div className="ToPlan__Content">
          <Button primary onClick={addTaskToPlan}><Plus /></Button>
          {loading
            ? <Loading />
            : (
              <div className="ToPlan__ItemContainer">
                {tasksToPlan?.map((taskToPlan) => (
                  <TaskToPlan
                    key={taskToPlan.id}
                    taskToPlan={taskToPlan}
                    updateSelectedTaskToPlan={updateSelectedTaskToPlan}
                  />
                ))}
              </div>
            )}
        </div>
      </div>

      <UpdateToPlanModal
        taskToPlan={selTaskToPlan}
        isVisible={toPlanModalVisible}
        closeModal={closeUpdateModal}
      />
    </>
  );
};

export default ToPlan;
