

function project(name) {
    let tasks = [];
    const id = (name === "inbox") ? "inbox" : crypto.randomUUID();

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
        return tasks;
    }

    const addTask = (task) => {
        tasks.push(task);
    }

    return {
        getId,
        getName, setName,
        getTasks, addTask
    }
}

export { project };