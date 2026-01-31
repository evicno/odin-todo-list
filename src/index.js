import "./styles.css";

import { todoManager } from "./modules/todoManager.js";
import { renderApp, renderLayout } from "./modules/domManager.js";

todoManager;
renderLayout();
renderApp();

