import { task } from "./task.js";
import { project } from "./project.js";

export const todoManager =(() => { 
    let projectList = [];
    const inbox = addProject("inbox");   
    let currentProject = inbox;

    function initApp() {

    }

    const getCurrentProject = () => {
        return currentProject;
    }

    const setCurrentProjectById = (id) => {
        currentProject = findProjectById(id);
    }

    // Create a project and add it to projectList
    function addProject(name) {
        const newProject = project(name);
        projectList.push(newProject);
        return newProject;
    }

    // Inbox is the default project for tasks without project defined
    function getInbox() {
        return inbox;
    }

    function getProjectList() {
        return projectList;
    }

    function deleteProject(project) {
        const index = projectList.indexOf(project);
        if (index != -1) {
            projectList.splice(index, 1);
        }
    }

    // Add task and add it to the project called (default: inbox)
    function addTask (title, dueDate, project=inbox) {
        let newTask = task(title, dueDate);
        project.addTask(newTask);
        return newTask;
    }

    function deleteTask(task) {
        const index = currentProject.getTasks().indexOf(task);
        if (index != -1) {
            currentProject.getTasks().splice(index, 1);
        }
    }

    // Find project by id and return the object
    function findProjectById(id) {
        let projectFound = projectList.find((el) => {
            return el.getId() == id });
        return projectFound;
    }


    return {
        getCurrentProject, setCurrentProjectById,
        addProject, addTask,
        getInbox, getProjectList,
        deleteProject, deleteTask,
        findProjectById
    }
})();
