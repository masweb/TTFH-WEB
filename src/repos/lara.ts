import Dexie from 'dexie';

class DataBase {
    async init( ) {
        const db = new Dexie('TTFH');
        db.version(1).stores({
            customers: '++id, name, description, hourly_rate, revenue, active',
            tasks: '++id, customer_id, task, active, running, openhistory, opencoment, hourly_rate, note, datecode',
            timedetail: '++id, task_id, start, end, hourly_rate, revenue, datecode'
        });
    }
}


class Client {

    async create(params: object) {
        console.log('pepe')
    }

    // async modify(params: object) {
    //
    // }
    //
    // async delete(params: object) {
    //
    // }

}


export default { DataBase, Client }