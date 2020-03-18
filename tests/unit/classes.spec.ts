import domain from '@/domain'
import applic from '@/application'
import moment from "moment";
import setGlobalVars from 'indexeddbshim';


it('Domain Client Class', () => {
    const cli = new domain.Client('pepe', 13 );
    expect(cli.name).toBe('pepe');
    expect(cli.hourlyRate).toBe(13);
})

it('Domain Task Class', () => {
    const tsk = new domain.Task(1, 'Nueva tarea' );
    expect(tsk.task).toBe('Nueva tarea');
 })

it('Domain TimeDetail Class', () => {
    let start = moment().format('YYYY-MM-DD HH:mm:ss')
    const tsk = new domain.TimeDetail(1 );
    expect(tsk.start).toBe(start);
})


// test('Application Client Class all() method', async () => {
//     const arr = [
//         {
//             "name": "Pizza Store",
//             "description": "",
//             "hourlyRate": 23,
//             "revenue": 0,
//             "active": true,
//             "id": 6
//         },
//         {
//             "name": "HAAGEN DASZ",
//             "description": "",
//             "hourlyRate": 23,
//             "revenue": 0,
//             "active": true,
//             "id": 5
//         },
//         {
//             "name": "DB Invest IBI",
//             "description": "",
//             "hourlyRate": 75,
//             "revenue": 0,
//             "active": true,
//             "id": 4
//         },
//         {
//             "name": "PC-Bank",
//             "description": "",
//             "hourlyRate": 12,
//             "revenue": 0,
//             "active": true,
//             "id": 3
//         },
//         {
//             "name": "NovoSpain",
//             "description": "",
//             "hourlyRate": 12,
//             "revenue": 0,
//             "active": true,
//             "id": 2
//         },
//         {
//             "name": "TTFH",
//             "description": "",
//             "hourlyRate": 14,
//             "revenue": 0,
//             "active": true,
//             "id": 1
//         }
//     ]
//     const all = await  new applic.Client
//     expect(all.all()).resolves.toBe(arr);
//
//
// })
//
