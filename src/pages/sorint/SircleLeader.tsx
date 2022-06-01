import Loading from 'components/atoms/Loading/Loading';
import { onSnapshot } from 'firebase/firestore';
import { getSircleLeaderIdeas } from 'firebaseUtils/firebase';
import { useEffect, useState } from 'react';
import { Idea } from 'sharedInterfaces';

const SircleLeader = () => {
  const [sircleLeaderIdeas, setSircleLeaderIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState<boolean>();

  useEffect(() => {
    setLoading(true);

    const getSircleLeaderIdeasSubscription = onSnapshot(getSircleLeaderIdeas(), (querySnapshot) => {
      const parsedSircleLeaderIdea = querySnapshot.docs.map((sircleLeaderIdea) => (
        { id: sircleLeaderIdea.id, ...sircleLeaderIdea.data() }
      )) as Idea[];
      const sortedIdeas = parsedSircleLeaderIdea.sort((a, b) => (a.priority < b.priority ? 1 : -1));
      setSircleLeaderIdeas(sortedIdeas);
      setLoading(false);
    });
    return () => getSircleLeaderIdeasSubscription();
  }, []);

  return loading
    ? <Loading />
    : <div>{sircleLeaderIdeas.map((idea) => <div key={idea.id}>{idea.title}</div>)}</div>;
};

export default SircleLeader;
