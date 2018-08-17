import { TASKS_URL } from '../utils/config'
import axios from 'axios';

export const getRandomTasks = async () => {
    const url = TASKS_URL;
    let tasks = [];

    try {
        const response = await axios.get(url);
        tasks = response.data;
    } catch (error) {
        console.error(error);
    }

    return tasks;
};