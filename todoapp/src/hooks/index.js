import { useState, useEffect } from 'react';
import moment from 'moment';
import { firebase } from '../firebase';
import { collactedTasksExist } from '../helpers';

export const useTasks = selectProject => {
    const [tasks, setTasks] = useState([]);
    const [archivedTasks, setArchivedTasks] = useState([]);
    useEffect(() => {
        let unsubscribe = firebase
            .firestore()
            .collection('tasks')
            .where('userId', '==', 'EZNBWeK61RIn');

        unsubscribe = selectProject && !collactedTasksExist(selectProject) 
            ? (unsubscribe = unsubscribe.where('projectId', '==', selectProject )) 
            : selectProject === 'TODAY' 
            ? (unsubscribe = unsubscribe.where(
                'date',
                '==',
                moment().format('DD/MM/YYYY')
            ))
        : selectProject === 'INBOX' || selectProject === 0
        ? (unsubscribe = unsubscribe.where('date', '==', ''))
        : unsubscribe;


        unsubscribe = unsubscribe.onSnapshot(snapshot => {
            const newTasks = snapshot.docs.map(task => ({
                id: tasks.id,
                ...tasks.data(),
            }))
            setTasks(
                selectProject == 'NEXT_7'
                ? newTasks.filter(
                    task => moment(task.date, 'DD-MM-YYYY').diff(moment(), 'days') <= 7 && task.archived !== true
                )
                : newTasks.filter(task => task.archived !== true)
            );

            setArchivedTasks(newTasks.filter(task => task.archived !== false))
        });
        return () => unsubscribe();
    }, [selectProject])

    return { tasks, archivedTasks };
};

export const useProjects = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        firebase
            .firestore()
            .collection('projects')
            .where('userId', '==', 'EZNBWeK61RIn')
            .orderBy('projectId')
            .get()
            .then(snapshot => {
                const allProjects = snapshot.dics.map(project => ({
                    ...project.data(),
                    docId: project.id,
                }));

                if(JSON.stringify(allProjects) !== JSON.stringify(projects)) {
                    setProjects(allProjects);
                }
            });
    }, [projects])
    return { projects, setProjects };
};