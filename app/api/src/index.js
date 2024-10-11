import express from "express";
import cors from "cors";
import { DBConnectorSQLite3 } from "./_services/dbSqlite3.js";
import { DBService } from "./_services/dbService.js";
import { EventService } from "./events/event.3_service.js";
import { TaskService } from "./tasks/task.3_service.js";
import { UserService } from "./users/user.3_service.js";
import { TaskController } from "./tasks/task.2_controller.js";
import { TaskRouter } from "./tasks/task.1_router.js";
import { EventController } from "./events/event.2_controller.js";
import { EventRouter } from "./events/event.1_router.js";
import { UserController } from "./users/user.2_controller.js";
import { UserRouter } from "./users/user.1_router.js";

const dbConnectorSQLite3 = new DBConnectorSQLite3("./data/db.sqlite3");

const dbService = new DBService(dbConnectorSQLite3);

const eventService = new EventService(dbService);
const eventController = new EventController(eventService);
const eventRouter = new EventRouter(eventController);

const taskService = new TaskService(dbService);
const taskController = new TaskController(taskService);
const taskRouter = new TaskRouter(taskController);

const userService = new UserService(dbService);
const usersController = new UserController(userService);
const userRouter = new UserRouter(usersController);

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/v1/events", eventRouter);
app.use("/api/v1/tasks", taskRouter);
app.use("/api/v1/users", userRouter);

app.post("/", (req, res) => {
    res.send("Hello World");
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
