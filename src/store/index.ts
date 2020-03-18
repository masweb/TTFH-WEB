import Vue from 'vue'
import Vuex from 'vuex'
import { Iclient, Itasks } from "@/interfaces";
import app from './../application'
import moment from "moment";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
      tasks: new Array<Itasks>(),
      client: {
          revenue: 0,
          hourlyRate: 0
      },
      currentview: 'home',
      clients: new Array<Iclient>(),
      theme: null,
      years: [
          {id: 20, name: '2020' },
          {id: 21, name: '2021' },
          {id: 22, name: '2022' },
          {id: 23, name: '2023' },
          {id: 24, name: '2024' },
          {id: 25, name: '2025' },
          {id: 26, name: '2026' },
          {id: 27, name: '2027' },
          {id: 28, name: '2028' },
          {id: 29, name: '2029' },
          {id: 30, name: '2030' },
          {id: 31, name: '2031' },
          {id: 32, name: '2032' },
      ],
      months: [
          {id: 1, name: 'enero'},
          {id: 2, name: 'febrero'},
          {id: 3, name: 'marzo'},
          {id: 4, name: 'abril'},
          {id: 5, name: 'mayo'},
          {id: 6, name: 'junio'},
          {id: 7, name: 'julio'},
          {id: 8, name: 'agosto'},
          {id: 9, name: 'septiembre'},
          {id: 10, name: 'octubre'},
          {id: 11, name: 'noviembre'},
          {id: 12, name: 'diciembre'},
      ],
      currentyear: 0,
      currentmonth: 0,
      datecode: '',
      activecustomer: 0,
      runningtasks: 0,
      hourlyRate: 0,
   },


   mutations: {

      async setClients(state) {
          const cli = new app.Client;
          state.clients = await cli.all()
          state.currentmonth = parseInt(moment().format('MM'))
          state.currentyear = parseInt(moment().format('YY'))
          state.datecode = moment().format('MM') + moment().format('YY')
      },

      setView(state, view) {
          state.currentview = view
      },

      setTheme(state, theme) {
          state.theme = theme
      },

       pushNewTask(state, task) {
           state.tasks.unshift(task)
       },

       setToggleHistory(state, params) {
           state.tasks.find((t, i) => {
               if (t.id ===  params.taskId ) state.tasks[i].openHistory = params.state
           })
        },



      async setCurrentCustomer(state, clientId) {
          state.activecustomer = clientId;
          const y = state.currentyear
          let m: string = state.currentmonth.toString()
          m = ('0' + m).slice(-2)
          const datecode =   m + y
          const cli = new app.Task
          const tasks = await cli.allTasksFromClient(clientId, datecode);
          state.tasks = tasks
          const det = new app.TimeDetail
          for (let x = 0; x < tasks.length; x++)
              tasks[x].detail = await det.allDetailsFromTask( tasks[x].id , state.datecode )

          state.clients.find( c => {
              if (c.id === clientId){
                  state.client = c
                  state.hourlyRate = c.hourlyRate
              }
          })
          state.tasks = tasks
          this.commit('calcTime')
          state.currentview = 'ClientContent'
      },


       setModCustomer(state, params) {
           state.clients.find((c, i) => {
               if (c.id === state.client["id"]) {
                   state.clients[i].name = params.name
                   state.clients[i].hourlyRate = params.hourlyRate
               }
           })
           this.commit('calcTime')
       },

       setRunningTask(state, newdetail) {
           state.tasks.find((t, i) => {
               if (t.id === newdetail.taskId) {
                   state.tasks[i].running = true
                   if(!state.tasks[i].detail) state.tasks[i].detail = []
                   state.tasks[i].detail.unshift(newdetail)
               }
           })
           this.commit('calcTime')
       },

       setStopTask(state, params) {
           state.tasks.find((t, i) => {
               if (t.id === params.taskId) {
                   state.tasks[i].running = false
                   state.tasks[i].detail = params.newdetail.reverse()
               }
           })
           this.commit('calcTime')
       },


       changeTaskName(state, params) {
           state.tasks.find((t, i) => {
               if (t.id === params.taskId) {
                   state.tasks[i].task =  params.task
               }
           })
           this.commit('setCurrentCustomer', state.activecustomer )
       },







       calcTime(state ) {
           let totaltask = 0.0
           let totalduration = 0.0
           let runningtasks = 0.0
           let alltask = 0.0

           for (let x = 0; x < state.tasks.length; x++) {
               totaltask = 0
               totalduration = 0
               if(state.tasks[x].running==true) runningtasks++
               if(state.tasks[x].detail)
                   for (let i = 0; i < state.tasks[x].detail.length; i++) {
                       if (state.tasks[x].detail[i].end != '') {
                           const st = moment(state.tasks[x].detail[i].start)
                           const ed = moment(state.tasks[x].detail[i].end)
                           const duration = ed.diff(st, "seconds")
                           const timeString = moment.utc(duration*1000).format('HH:mm:ss');
                           let amountPerHour = 0
                           if(state.tasks[x].hourlyRate == 0) {
                                amountPerHour =  state.client.hourlyRate
                           }
                           else amountPerHour =  state.tasks[x].hourlyRate
                           const time = timeString.split(':').reduce((r, a: any, i) => r + a * Math.pow(60, -i), 0)
                           const result = (time * amountPerHour).toFixed(2)
                           const nres = parseFloat(result)
                           totaltask += nres
                           totalduration += duration
                       }
                   }
               const formated = moment.utc(totalduration*1000).format('HH:mm:ss');
               state.tasks[x].totalduration = formated
               state.tasks[x].revenue = Math.round( totaltask * 1e2 ) / 1e2;
               alltask += totaltask

           }
           state.runningtasks = runningtasks
           state.client.revenue = Math.round( alltask * 1e2 ) / 1e2;

       },
       nextMonth(state) {
           let cm = state.currentmonth
           cm++
           if (cm == 13) {
               state.currentmonth = 1
               let cy = state.currentyear
               cy++
               if (state.years.find(y => y.id === cy)) state.currentyear = cy
           } else {
               state.currentmonth = cm
           }
           this.commit('setCurrentCustomer', state.activecustomer )
       },

       prevMonth(state) {
           let cm = state.currentmonth
           cm--
           if (cm == 0) {
               state.currentmonth = 12
               let cy = state.currentyear
               cy--
               if (state.years.find(y => y.id === cy)) state.currentyear = cy
           } else {
               state.currentmonth = cm
           }
           this.commit('setCurrentCustomer', state.activecustomer )
       },

       switchNotes(state, taskId) {
           state.tasks.find((t, i) => {
               if (t.id ===  taskId )  state.tasks[i].opencoment = !state.tasks[i].opencoment
           })
       },

       setNote(state, params) {
           state.tasks.find((t, i) => {
               if (t.id ===  params.taskId )  state.tasks[i].note = params.textnote
           })
       },

   },

})
