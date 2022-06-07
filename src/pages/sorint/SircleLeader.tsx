import Loading from 'components/atoms/Loading/Loading';
import Ideas from 'components/organisms/Ideas/Ideas';
import Todos from 'components/organisms/Todos/Todos';
import { onSnapshot } from 'firebase/firestore';
import { getIdeas, getTodos } from 'firebaseUtils/firebase';
import React, { useEffect, useState } from 'react';
import { Idea, Todo } from 'sharedInterfaces';
import './SircleLeader.scss';

const SircleLeader = () => {
  const [sircleLeaderIdeas, setSircleLeaderIdeas] = useState<Idea[]>([]);
  const [sircleLeaderTodos, setSircleLeaderTodos] = useState<Todo[]>([]);
  const [loadingIdeas, setLoadingIdeas] = useState<boolean>(true);
  const [loadingTodos, setLoadingTodos] = useState<boolean>(true);

  useEffect(() => {
    const getSircleLeaderIdeasSubscription = onSnapshot(getIdeas('sircleLeaderIdeas'), (querySnapshot) => {
      const parsedSircleLeaderIdea = querySnapshot.docs.map((sircleLeaderIdea) => (
        { id: sircleLeaderIdea.id, ...sircleLeaderIdea.data() }
      )) as Idea[];
      const sortedIdeas = parsedSircleLeaderIdea.sort((a, b) => (a.priority < b.priority ? 1 : -1));
      setSircleLeaderIdeas(sortedIdeas);
      setLoadingIdeas(false);
    });
    return () => getSircleLeaderIdeasSubscription();
  }, []);

  useEffect(() => {
    const getSircleLeaderTodosSubscription = onSnapshot(getTodos('sircleLeaderTodos'), (querySnapshot) => {
      const parsedTodos = querySnapshot.docs.map((sircleLeaderIdea) => ({
        id: sircleLeaderIdea.id,
        ...sircleLeaderIdea.data(),
        lastUpdate: sircleLeaderIdea.data().lastUpdate.toDate(),
      })) as Todo[];
      const sortedTodos = parsedTodos.sort((a, b) => (a.priority < b.priority ? 1 : -1));
      setSircleLeaderTodos(sortedTodos);
      setLoadingTodos(false);
    });
    return () => getSircleLeaderTodosSubscription();
  }, []);

  return loadingIdeas || loadingTodos
    ? <Loading />
    : (
      <>
        <div className="SircleLeader__Container">
          <Ideas coll="sircleLeaderIdeas" ideas={sircleLeaderIdeas} />
          <Todos coll="sircleLeaderTodos" todos={sircleLeaderTodos} />
        </div>
      </>
    );
};

export default React.memo(SircleLeader);
