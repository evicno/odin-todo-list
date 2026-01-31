import { task } from "./task";

function project( { name, 
                    tasks: rawTasks = [],
                    id = (name === "inbox") ? "inbox" : crypto.randomUUID()
                } ) {

    let livingTasks = rawTasks.map(t => task(t));

    const getId = () => {
        return id;
    }

    const getName = () => {
        return name;
    }

    const setName = (newName) => {
        name= newName;
    }

    const getTasks = () => {
        return livingTasks;
    }

    const addTask = (task) => {
        livingTasks.push(task);
    }

    const getData = () => {
        const tasksData = livingTasks.map( task => task.getData());
        return { name, tasks: tasksData, id };
    }

    return {
        getId,
        getName, setName,
        getTasks, addTask,
        getData
    }
}

export { project };