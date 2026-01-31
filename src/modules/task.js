
function task({ title, 
                dueDate, 
                project = "inbox",
                description = "", 
                priority = "low", 
                check = false,
                id = crypto.randomUUID() }) {
    
    let isChecked = check;

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
        return isChecked;
    }

    const switchCheck = () => {
        isChecked = !isChecked;
    }

    const getId = () => {
        return id;
    }

    const getProject = () => {
        return project;
    }

    const getData = () => {
        return  { title, description, dueDate, project, priority, check: isChecked, id };
    }

    return {
        getTitle, setTitle,
        getDescription, setDescription,
        getDueDate, setDueDate,
        getPriority,
        getProject,
        getCheck, switchCheck,
        getId,
        getData
    }
}

export { task };