import { todoManager } from "./todoManager.js";

import { format } from "date-fns";

import logoCheck from "../images/logo-check.png";
import checkBoxImg from "../images/checkbox.png";
import checkedBoxImg from "../images/checkedbox.png";
import add from "../images/add.png";
import projectImg from "../images/assignment.png";
import inboxImg from "../images/inbox.png";

const sidebar = document.querySelector(".sidebar");
const mainContent = document.querySelector(".main");

const dialogActions = {
    project: openProjectDialog,
    task: openTaskDialog,
}

export function renderLayout() {
    // Render header
    const header = document.querySelector("header");
    const logo = document.createElement("img");
    logo.src = logoCheck;
    header.appendChild(logo);
    const headerText = document.createElement("h1");
    headerText.textContent = "Todo List";
    header.appendChild(headerText);

    // Render sidebar with project title and an empty list
    const projects = document.createElement("div");
    projects.classList.add("projects");

    const projectTitle = document.createElement("h2");
    projectTitle.textContent = "Projects"; 

    const projectList = document.createElement("ul");
    
    projects.appendChild(projectTitle);
    projects.appendChild(projectList);
    sidebar.appendChild(projects);

    // Add button to add project
    const addProjectButton = document.createElement("button");
    addProjectButton.classList.add("add");
    addProjectButton.id = "add-project";
    addButton(addProjectButton, "project");
    sidebar.appendChild(addProjectButton);

    // Render main content

    // Render current project h2
    const currentProject = document.createElement("h2");
    currentProject.classList.add("current");
    mainContent.appendChild(currentProject);

    // Add tasks div
    const tasks = document.createElement("div");
    tasks.classList.add("tasks");
    mainContent.appendChild(tasks);

    // Add button to add task
    const addTaskButton = document.createElement("button");
    addTaskButton.classList.add("add");
    addTaskButton.id = "add-task";
    addButton(addTaskButton, "task");
    mainContent.appendChild(addTaskButton);

    // Initialise cancel buttons of the dialog
    initCancelButtons();

    // Add event listeners to submit forms
    const projectForm = document.querySelector("#project-dialog form");
    projectForm.addEventListener("submit", () => {
        const name = document.getElementById("name").value;
        todoManager.addProject({name: name});
        renderProjects();
    })


    const taskForm = document.querySelector("#task-dialog form");
    taskForm.addEventListener("submit", () => {
        const title = document.getElementById("title").value;
        const projectId = document.getElementById("project-linked").value;
        const project = todoManager.findProjectById(projectId);
        

        const description = document.getElementById("description").value;
        const dueDate = document.getElementById("due-date").value;
        const priority = document.querySelector("input[name = 'priority']:checked").value;
        const newTask = {
            title,
            description,
            dueDate,
            project,
            priority
        }
        todoManager.addTask(newTask);
        renderTasks();
    })
}

export function renderApp() {
    renderProjects();
    renderTasks();
}

function renderProjects() {    
    const projectList = document.querySelector(".projects ul");
    projectList.replaceChildren();

    let projectListData = todoManager.getProjectList();
    for (const project of projectListData) {
        const li = document.createElement("li");
        li.classList.add("project");
        li.dataset.id = project.getId();

        // Add icon
        let listIcon = document.createElement("img");
        listIcon.src = (project.getId() === "inbox") ? inboxImg : projectImg;
        li.appendChild(listIcon);

        // Add name of project
        const p = document.createElement("h3");
        p.textContent = project.getName();
        li.appendChild(p);

        // Add delete button (except for inbox)
        if (project.getId() != "inbox") {
            const deleteProjectButton = document.createElement("button");
            deleteProjectButton.textContent = "X";
            li.appendChild(deleteProjectButton);

            // add event listener 
            deleteProjectButton.addEventListener("click", () => {
            if (todoManager.getCurrentProject() === project) {
                todoManager.setCurrentProjectById("inbox");
                setCurrentProject();
            }
            todoManager.deleteProject(project);
            renderProjects();
            });
        };

        projectList.appendChild(li);

        // Add event listeners to select or delete project
        p.addEventListener("click", () => {
            todoManager.setCurrentProjectById(project.getId());
            setCurrentProject();
        });
    };

    setCurrentProject();

    
}

function setCurrentProject() {
    const currentProject = todoManager.getCurrentProject();
    
    // Add name of current project in main content
    const currentHeading = document.querySelector(".current");
    currentHeading.textContent = currentProject.getName();

    // Render tasks of current project
    renderTasks();

    // Set current id to the current project item in the project list
    const projectItems = document.querySelectorAll(".project");
    projectItems.forEach(project => {
        project.removeAttribute("id");
    });
    projectItems.forEach(project => {
        if (project.dataset.id === currentProject.getId()) {
            project.id = "current";
        };
    });
}

function renderTasks() {
    const tasks = document.querySelector(".tasks");
    tasks.replaceChildren();

    const taskHigh = document.createElement("ul");
    taskHigh.classList.add("high");
    tasks.appendChild(taskHigh);

    const taskMedium = document.createElement("ul");
    taskMedium.classList.add("medium");
    tasks.appendChild(taskMedium);

    const taskLow = document.createElement("ul");
    taskLow.classList.add("low");
    tasks.appendChild(taskLow);

    // Create task items
    const currentProjectTasks = todoManager.getCurrentProject().getTasks();
    for (const task of currentProjectTasks) {
        classifyTaskByPriority(task);
    }
    
}

function classifyTaskByPriority(task) {
    const priority = "." + task.getPriority();
    const priorityDiv = document.querySelector(priority);
    priorityDiv.appendChild(createTaskItem(task));
}

function createTaskItem(task) {
    const t = document.createElement("li");
    t.classList.add("task-item");

    // Check box
    const checkBox = document.createElement("img");
    checkBox.src = task.getCheck() ? checkedBoxImg : checkBoxImg;
    t.dataset.active = task.getCheck() ? false : true;
    t.appendChild(checkBox);

    // Title of the task
    const title = document.createElement("h3");
    title.textContent = task.getTitle();
    t.appendChild(title);

    // Description
    const description = document.createElement("p");
    description.textContent = task.getDescription();
    t.appendChild(description);

    // Due date
    const dueDate = document.createElement("div");
    dueDate.textContent = task.getDueDate();
    t.appendChild(dueDate);

    // Delete button
    const deleteTaskButton = document.createElement("button");
    deleteTaskButton.textContent = "X";
    t.appendChild(deleteTaskButton);

    // Event listeners to check/uncheck and delete task
    checkBox.addEventListener("click", () => {
        todoManager.switchCheck(task);
        checkBox.src = task.getCheck() ? checkedBoxImg : checkBoxImg;
        t.dataset.active = task.getCheck() ? false : true;
        renderTasks();
    })

    deleteTaskButton.addEventListener("click", () => {
        todoManager.deleteTask(task);
        renderTasks();
    })

    return t;
}

function addButton(button, type) {
    // Add icon and text
    const addIcon = document.createElement("img");
    addIcon.src = add;
    button.appendChild(addIcon);
    const addText = document.createElement("h2");
    addText.textContent = "Add " + type;
    button.appendChild(addText);

    // Add event listener
    button.addEventListener("click", () => {
        dialogActions[type]();
    });

    return button;
}

function initCancelButtons() {
    const cancelButtons = document.querySelectorAll(".close");
    cancelButtons.forEach(button => {
        button.addEventListener("click", () => {
            button.closest("dialog").close();
        });
    });
}

function openProjectDialog() {
    const projectDialog = document.querySelector("#project-dialog");
    const projectForm = document.querySelector("#project-dialog form");

    projectForm.reset();
    projectDialog.showModal();
}

function openTaskDialog() {
    const taskDialog = document.querySelector("#task-dialog");
    const taskForm = document.querySelector("#task-dialog form");

    // Actualise projects options in select
    renderProjectOptions();

    //Set the minimum due date to today
    const date = document.querySelector("#due-date");
    const today = format(new Date(), "yyyy-MM-dd");
    date.min = today;

    taskForm.reset();
    taskDialog.showModal();
}

function renderProjectOptions() {
    const projectList = todoManager.getProjectList();
    const select = document.querySelector("#project-linked");
    const inboxOption = document.querySelector("#inbox-option");

    select.replaceChildren(inboxOption);

    for (const project of projectList) {
        if (project.getId() != "inbox") {
            const option = document.createElement("option");
            option.value = project.getId();
            option.textContent = project.getName();
            select.appendChild(option);
        }
    }
}


