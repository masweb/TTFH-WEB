import domain from './domain'
import repo from './repos/indexdb'
import { Iclient, Itasks, Itimedetail } from './interfaces'

class Client {

    async all() {
        const conn = new repo.Client
        const clients = await conn.all()
        return clients
    }
    async clear() {
        const conn = new repo.Client
        await conn.clear()
    }

    async loadData( clients: Array<Iclient>) {
        const conn = new repo.Client
        await conn.loadData(clients)
    }


    async create(name: string, hourlyRate: number) {
        const newcliewnt =  new domain.Client( name, hourlyRate )
        const conn = new repo.Client
        await conn.create( newcliewnt )
     }

    async modClient(clientId: number, name: string, hourlyRate: number) {
        const conn = new repo.Client
        await conn.modClient( clientId, name, hourlyRate )
        return  'ok'
    }

}

class Task {

    async all() {
        const conn = new repo.Task
        const tasks = await conn.all()
        return tasks
    }
    async clear() {
        const conn = new repo.Task
        await conn.clear()
    }

    async loadData( tasks: Array<Itasks>) {
        const conn = new repo.Task()
        await conn.loadData(tasks)
    }

    async allTasksFromClient( clientId: number,  datecode: string) {
        const conn = new repo.Task
        const tasks = await conn.allTasksFromClient( clientId, datecode )
        return await tasks
    }

    async getTask( taskId: number ) {
        const conn = new repo.Task
        const tsk = await conn.getTask( taskId )
        return await  tsk
    }

    async create(clientId: number, task: string) {
        const newtask =  new domain.Task( clientId, task )
        const conn = new repo.Task
        const ntsk = await conn.create( newtask )
        return await  ntsk
    }

    async toggleHistory(id: number) {
        const conn = await new repo.Task
        const res =  await conn.toggleHistory( id )
        return await  res
    }

    async saveNote(taskId: number, textNote: string) {
        const conn = await new repo.Task
        const res =  await conn.saveNote(taskId, textNote)
        return await  res
    }

    async deleteTask(taskId: number) {
        const conn = await new repo.Task
        await conn.deleteTask(taskId)
        return await 'ok'
    }

    async modHourlyTask(taskId: number, hourly: number) {
        const conn = await new repo.Task
        await conn.modHourlyTask( taskId, hourly )
        return await 'ok'
    }

    async setHourlyToZero(taskId: number) {
        const conn = await new repo.Task
        await conn.setHourlyToZero( taskId )
        return await 'ok'
    }

    async changeTaskName(taskId: number, task: string) {
        const conn = await new repo.Task
        await conn.changeTaskName( taskId, task  )
        return await 'ok'
    }

}


class TimeDetail {

    async all() {
        const conn = new repo.TimeDetail
        const dets = await conn.all()
        return dets
    }

    async clear() {
        const conn = new repo.TimeDetail
        await conn.clear()
    }
    async loadData( timedetail: Array<Itimedetail>) {
        const conn = new repo.TimeDetail()
        await conn.loadData(timedetail)
    }

    async playnNewTask( taskId: number ) {
        const playtask =  new domain.TimeDetail(taskId)
        const conn = new repo.TimeDetail
        const ress = await conn.playnNewTask(playtask)
        return await ress
    }

    async stopTask( taskId: number ) {
        const conn = new repo.TimeDetail
        const ress = await conn.stopTask(taskId)
        return await ress
    }

    async allDetailsFromTask( taskId: number, dateCode: string ) {
        const conn = new repo.TimeDetail
        const details = await conn.allDetailsFromTask( taskId, dateCode )
        return await details
    }

    async deleteDetail( detId: number) {
        const conn = new repo.TimeDetail
        const details = await conn.deleteDetail( detId  )
        return await details
    }

    async deleteDetailsFromTask( taskId: number) {
        const conn = new repo.TimeDetail
        const details = await conn.deleteDetailsFromTask( taskId  )
        return await 'ok'
    }

}

export default { Client, Task, TimeDetail }