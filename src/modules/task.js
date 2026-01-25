
function task(title, dueDate) {
    let description = "";
    let priority = "low";
    let check = false;
    const id = crypto.randomUUID();

    const getTitle = () => {
        return title;
    }

    const setTitle = (newTitle) => {
        title = newTitle;
    }

    const getDescription = () => {
        return description;
    }

    const setDescription = (newDescription) => {
        description = newDescription;
    }

    const getDueDate = () => {
        return dueDate;
    }

    const setDueDate = (newDate) => {
        dueDate = newDate;
    }

    const getPriority = () => {
        return priority;
    }

    const setPriority = (newPriority) => {
        const priorities = ["high", "medium", "low"];
        if (priorities.includes(newPriority)) {
            priority = newPriority;
        }
        else return;
        
    }

    const getCheck = () => {
        return check;
    }

    const switchCheck = () => {
        check = !check;
    }

    const getId = () => {
        return id;
    }

    return {
        getTitle, setTitle,
        getDescription, setDescription,
        getDueDate, setDueDate,
        getPriority, setPriority,
        getCheck, switchCheck,
        getId
    }
}

export { task };