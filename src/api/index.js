import { TASKS_URL } from '../utils/config'
import axios from 'axios';

export const getRandomTasks = async () => {
    const url = TASKS_URL;
    let tasks = [];
    // const headers = {
    //   Accept: 'application/json',
    //   'Content-Type': 'application/json',
    //   Authorization: `JWT ${token}`,
    // }
  
    try {
        const response = await axios.get(url);
        tasks = response.data;
    } catch (error) {
        console.error(error);
    }

    //const res = await axios.get(url);
    //console.log(res);
    //const data = res.data;

    //return data;
    return tasks;
};