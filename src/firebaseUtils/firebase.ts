import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { CreateTaskRequest, CreateTaskToPlanRequest } from '../sharedInterfaces';

export const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

export const startFirebase = () => {
  if (!firebase?.apps?.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app(); // if already initialized, use that one
  }
};

export type FirebaseUser = firebase.User;

export const { auth } = firebase;

/** ************ TASKS **************** */
export const getTasksByWeek = (week: number) => firebase.firestore().collection('tasks').where('year', '==', 2021).where('week', '==', week);

export const addTask = async (task: CreateTaskRequest) => firebase.firestore().collection('tasks').add(task);

export const updateTask = async (id: string, task: CreateTaskRequest) => firebase.firestore().collection('tasks').doc(id).update(task);

export const updateDoneTask = async (id: string, done: boolean) => firebase.firestore().collection('tasks').doc(id).update({ done });

export const deleteTask = async (id: string) => firebase.firestore().collection('tasks').doc(id).delete();

/** ************ TASKS TO PLAN **************** */
export const getTasksToPlan = () => firebase.firestore().collection('plan');

export const addTaskToPlan = async (taskToPlan: CreateTaskToPlanRequest) => firebase.firestore().collection('plan').add(taskToPlan);

export const updateTaskToPlan = async (id: string, taskToPlan: CreateTaskToPlanRequest) => firebase.firestore().collection('plan').doc(id).update(taskToPlan);

export const deleteTaskToPlan = async (id: string) => firebase.firestore().collection('plan').doc(id).delete();

/** ************ PROJECTS **************** */
export const getProjects = () => firebase.firestore().collection('projects');
