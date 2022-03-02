import { ApplicationSettings } from "@nativescript/core";
import { SnackBar } from "@nstudio/nativescript-snackbar";

export default class TaskServise {
    addTask(task) {
        ApplicationSettings.setBoolean("task", JSON.stringify(task));
    }

    getAllTasks() {
        const tasks = ApplicationSettings.getAllKeys("task")
        const result = []
        if (tasks) {
            rawTodo = Array(JSON.parse(tasks))
            rawTodo.forEach(task => {
                result.push(task)
            });
            return result
        }
        return []
    }

    removeTask(task) {
        ApplicationSettings.remove("completed", task.completed);
        ApplicationSettings.remove("title", tasl.title);
    }
}