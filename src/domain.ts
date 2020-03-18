import moment from 'moment';

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
        this.datecode =  moment().format('MMYY')
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
    datecode: string;
    constructor( taskId: number) {
        this.taskId = taskId;
        this.end = '';
        this.start = moment().format('YYYY-MM-DD HH:mm:ss')
        this.datecode =  moment().format('MMYY');
    }
}

export default { Client, Task, TimeDetail }