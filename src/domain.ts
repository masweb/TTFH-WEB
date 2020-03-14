
import moment from 'moment';

class User {
    name: string;
    surname: string;
    email: string;
    constructor( name: string, surname: string, email: string   ) {
        this.name = name;
        this.surname = surname;
        this.email = email;
     }
}

class Client {
    id?: number;
    name: string;
    description: string;
    hourlyRate: number;
    revenue: number;
    active: boolean;
    constructor(name: string, hourlyRate: number) {
        this.name = name;
        this.description = '';
        this.hourlyRate = hourlyRate;
        this.revenue = 0;
        this.active = true;
    }
}




// class TasksList {
//     title: string;
//     active: boolean;
//     projectId: number;
//     tasks: Array<Task>
//     constructor( title: string, active: boolean, projectId: number ) {
//         this.title = title;
//         this.active = active;
//         this.projectId = projectId;
//         this.tasks = [];
//     }
// }


class Task {
    id?: number;
    task: string;
    clientId: number;
    hourlyRate: number;
    active: boolean;
    running: boolean;
    note: string;
    openHistory: boolean;
    opencoment: boolean;
    datecode: string;
    revenue: number;
    totalduration: string;
    detail: Array<TimeDetail>

    constructor( clientId: number, task: string,) {
        this.task = task;
        this.clientId = clientId;
        this.hourlyRate = 0;
        this.active = true;
        this.running = false;
        this.note = '';
        this.openHistory = false;
        this.opencoment = false;
        this.datecode =  moment().format('MMYY');
        this.detail = [];
        this.totalduration = '';
        this.revenue = 0;
    }

}

class TimeDetail {
    id?: number;
    taskId: number;
    start: string;
    end: string;
    hourlyRate: number;
    revenue: number;
    datecode: string;
    constructor( taskId: number) {
        this.taskId = taskId;
        this.end = '';
        this.start = moment().format('YYYY-MM-DD HH:mm:ss');
        this.hourlyRate = 0;
        this.revenue = 0;
        this.datecode =  moment().format('MMYY');

    }
}

export default {  User, Client, Task, TimeDetail }