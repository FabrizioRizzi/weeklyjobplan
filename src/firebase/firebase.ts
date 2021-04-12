import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { CreateTaskRequest } from '../sharedInterfaces';

export const firebaseConfig = {
  apiKey: "AIzaSyC2LG6kfZn8-2b6yfG2Q4DUBdqXSVxXbRU",
  authDomain: "weeklyjobplan.firebaseapp.com",
  projectId: "weeklyjobplan",
  storageBucket: "weeklyjobplan.appspot.com",
  messagingSenderId: "523967887852",
  appId: "1:523967887852:web:2915c0b41af24b1f5228c9",
  measurementId: "G-G8F7SWFRTH"
};

firebase.initializeApp(firebaseConfig);

export type FirebaseUser = firebase.User;

export const auth = firebase.auth();

export const getTasksByWeek = (week: number) => {
  return firebase.firestore().collection('tasks').where("year", "==", 2021).where("week", "==", week);
};

export const addTask = async (task: CreateTaskRequest) => {
  return firebase.firestore().collection('tasks').add(task)
}

export const updateTask = async (id: string, task: CreateTaskRequest) => {
  return firebase.firestore().collection('tasks').doc(id).update(task)
}

export const updateDoneTask = async (id: string, done: boolean) => {
  return firebase.firestore().collection('tasks').doc(id).update({done})
}