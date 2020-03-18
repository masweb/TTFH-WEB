import Dexie from 'dexie'
import { Iclient, Itasks, Itimedetail } from './../interfaces'
import moment from "moment";

class DataBase extends Dexie {
    clients: Dexie.Table<Iclient, number>;
    tasks: Dexie.Table<Itasks, number>;
    timedetail: Dexie.Table<Itimedetail, number>;

    constructor() {
        super("TTFH")
        this.version(2).stores({
            clients: '++id, name, description, hourlyRate, revenue, active',
            tasks: '++id, *clientId, [clientId+datecode], task, active, running, openHistory, opencoment, hourlyRate, note',
            timedetail: '++id,*taskId, [taskId+datecode], [taskId+end], start, hourlyRate, revenue'
        });

        this.clients = this.table("clients");
        this.tasks = this.table("tasks");
        this.timedetail = this.table("timedetail");
    }
}


class Client extends DataBase {

    async all() {
        const clients = await this.clients.toArray()
        return clients.reverse();
    }

    async loadData( clients: Array<Iclient>) {
        for (let i = 0; i < clients.length; i++)
            await this.clients.add(clients[i])
    }

    async clear() {
        await this.clients.clear()
     }

    async create(newclient: Iclient) {
        const nc = await this.clients.add(newclient)
        return nc
    }

    async modClient(clientId: number, name: string, hourlyRate: number) {
        this.clients.where({id: clientId}).modify({name: name })
        this.clients.where({id: clientId}).modify({hourlyRate: hourlyRate })
        return await 'ok'
    }

    async deleteClient(clientId: number) {
        const tasks = await this.tasks.where({clientId: clientId}).toArray()
        await console.log('tasks', tasks)
        for ( let i = 0; i < tasks.length; i++ ) {
            await this.timedetail.where({ taskId: tasks[i].id }).delete()
        }
        await  this.tasks.where({clientId: clientId}).delete()
        await this.clients.where({id: clientId}).delete()
        return await 'ok'
    }


}

class Task extends DataBase {

    async all() {
        const tasks = await this.tasks.toArray()
        return tasks
    }
    async clear() {
        await this.tasks.clear()
    }

    async loadData( tasks: Array<Itasks>) {
        for (let i = 0; i < tasks.length; i++)
            await this.tasks.add(tasks[i])
    }

    async allTasksFromClient(clientId: number, dateCode: string) {
        const tasks = await this.tasks.where({clientId: clientId, datecode: dateCode }).toArray()
        return await tasks.reverse()
    }

    async getTask( taskId: number ) {
        const task  = await this.tasks.where({id: taskId}).first()
        return await  task
    }

    async create(newtask: Itasks ) {
        await this.tasks.add(newtask)
        return await  newtask
    }

    async toggleHistory(id: number) {
        const task = await this.tasks.where({id: id}).first()
        await this.tasks.where({id: id}).modify({openHistory: !task.openHistory})
        return await  !task.openHistory
     }

    async saveNote(taskId: number, textNote: string) {
        const res = await this.tasks.where({id: taskId}).modify({note: textNote})
        return await res
    }

    async deleteTask(taskId: number) {
        await this.tasks.where({id: taskId}).delete()
        return await 'ok'
    }

    async modHourlyTask(taskId: number, hourly: number) {
        this.tasks.where( {id: taskId} ).modify({ hourlyRate: hourly })
        return await 'ok'
    }

    async setHourlyToZero(taskId: number) {
        await this.tasks.where({id: taskId}).modify({ hourlyRate: 0 })
        return await 'ok'
    }

    async changeTaskName(taskId: number, task: string) {
        await this.tasks.where({id: taskId}).modify({ task: task })
        return await 'ok'
    }

}

class TimeDetail extends DataBase {

    async all() {
        const details = await this.timedetail.toArray()
        return details
    }

    async clear() {
        await this.timedetail.clear()
    }

    async loadData( timedetail: Array<Itimedetail>) {
        for (let i = 0; i < timedetail.length; i++)
            await this.timedetail.add(timedetail[i])
    }

    async playnNewTask( newTimeDetail: Itimedetail) {
        await this.timedetail.add(newTimeDetail)
        await this.tasks.where('id').equals(newTimeDetail.taskId).modify({running: true})
        return newTimeDetail
    }

    async allDetailsFromTask( taskId: number, dateCode: string ) {
        const details = await this.timedetail.where({taskId: taskId, datecode: dateCode }).toArray()
        return details.reverse()
    }

    async stopTask(id: number) {
        await this.timedetail.where({taskId: id, end: ''}).modify({end: moment().format('YYYY-MM-DD HH:mm:ss')})
        await this.tasks.where({id: id}).modify({running: 0})
        const newdetail = await this.timedetail.where({taskId: id}).toArray()
        return newdetail
    }

    async deleteDetail( detId: number) {
        await this.timedetail.where({id: detId}).delete()
        return detId
    }

    async deleteDetailsFromTask( taskId: number) {
        await this.timedetail.where({taskId: taskId}).delete()
        return 'ok'
    }

}


export default {DataBase, Client, Task, TimeDetail}