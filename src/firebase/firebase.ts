import firebase from 'firebase/app';
import 'firebase/firestore';
import { TaskInterface } from '../sharedInterfaces';

export const firebaseConfig = {
  apiKey: "AIzaSyC2LG6kfZn8-2b6yfG2Q4DUBdqXSVxXbRU",
  authDomain: "weeklyjobplan.firebaseapp.com",
  projectId: "weeklyjobplan",
  storageBucket: "weeklyjobplan.appspot.com",
  messagingSenderId: "523967887852",
  appId: "1:523967887852:web:2915c0b41af24b1f5228c9",
  measurementId: "G-G8F7SWFRTH"
};

export const getTasksByWeek = async (week: number) => {
  const tasks = await firebase.firestore().collection('tasks').where("year", "==", 2021).where("week", "==", week).get();
  return tasks.docs.map(task => task.data());
};

export const addTask = async (task?: TaskInterface) => {
  return firebase.firestore().collection('tasks').add({
    name: 'Prova',
    description: 'Prova',
    dayIndex: 4,
    done: false,
    week: 15,
    year: 2021,
    length: 60
  })
}