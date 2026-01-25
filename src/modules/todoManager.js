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
        projectList.splice(index, 1);
    }

    // Add task and add it to the project called (default: inbox)
    function addTask (title, dueDate, project=inbox) {
        let newTask = task(title, dueDate);
        project.addTask(newTask);
        return newTask;
    }

    // Find project by id and return the object
    function findProjectById(id) {
        let projectFound = projectList.find((el) => {
            return el.getId() == id });
        return projectFound;
    }

    // Find task by id by looping through projects
    function findTaskById(id) {
        for (const project of projectList) {
            let taskFound = project.getTasks().find((el) => {
                return el.getId() == id });
            if (taskFound) {
                return taskFound ;
            }
        }
    }

    return {
        getCurrentProject, setCurrentProjectById,
        addProject, addTask,
        getInbox, getProjectList,
        deleteProject,
        findProjectById, findTaskById,
    }
})();
