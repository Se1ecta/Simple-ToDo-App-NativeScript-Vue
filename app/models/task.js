import { EventData, Observable } from 'data/observable';

class Task extends Observable {
    title;
    completed = false;

    constructor(title, completed = false) {
        super();

        this.text = text;
        this.completed = completed
    }
}

export default Task;