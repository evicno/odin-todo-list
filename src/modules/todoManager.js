import { task } from "./task.js";
import { project } from "./project.js";
import { storageManager } from "./storageManager";

export const todoManager =(() => { 
    let projectList = [];
    projectList = storageManager.initProjectList();
    let currentProject = findProjectById(storageManager.getCurrentProjectId());
    storageManager.setCurrentProjectId(currentProject.getId());

    function setData() {
        storageManager.setProjectListData(projectList);
        storageManager.setCurrentProjectId(currentProject.getId());
    }

    const getCurrentProject = () => {
        return currentProject;
    }

    const setCurrentProjectById = (id) => {
        currentProject = findProjectById(id);
        storageManager.setCurrentProjectId(id);
    }

    // Create a project and add it to projectList
    function addProject(name) {
        const newProject = project(name);
        projectList.push(newProject);
        storageManager.setProjectListData(projectList);
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
            setData();
        }
    }

    function addTask(taskData) {
        const newTask = task(taskData);
        const project = newTask.getProject();
        project.addTask(newTask);
        currentProject = findProjectById(storageManager.getCurrentProjectId());
        setData();
    }

    function deleteTask(task) {
        const index = currentProject.getTasks().indexOf(task);
        if (index != -1) {
            currentProject.getTasks().splice(index, 1);
            setData();
        }
    }

    function switchCheck(task) {
        task.switchCheck();
        setData();
    }

    // Find project by id and return the object
    function findProjectById(id) {
        let projectFound = projectList.find((el) => {
            return el.getId() == id });
        return projectFound;
    }


    return {
        //initApp,
        getCurrentProject, setCurrentProjectById,
        addProject, addTask,
        getInbox, getProjectList,
        deleteProject, deleteTask, switchCheck,
        findProjectById
    }
})();
