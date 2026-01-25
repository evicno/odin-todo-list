import "./styles.css";

import { todoManager } from "./modules/todoManager.js";
import { renderApp, renderLayout } from "./modules/domManager.js";


// let projectOne = todoManager.addProject("projet 1");
// todoManager.addProject("project 2");


// let taskOne = todoManager.addTask("task 1", "today");
// taskOne.setDescription("blabla");
// taskOne.switchCheck();

// todoManager.addTask("task2", "tomorrow");


renderLayout();
renderApp();