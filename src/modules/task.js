
function task({ title, 
                dueDate, 
                project = "inbox",
                description = "", 
                priority = "low", 
                check = false,
                id = crypto.randomUUID() }) {

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

    const getCheck = () => {
        return check;
    }

    const switchCheck = () => {
        check = !check;
    }

    const getId = () => {
        return id;
    }

    const getProject = () => {
        return project;
    }

    return {
        getTitle, setTitle,
        getDescription, setDescription,
        getDueDate, setDueDate,
        getPriority,
        getProject,
        getCheck, switchCheck,
        getId
    }
}

export { task };