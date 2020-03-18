<script lang="ts">
    import Vue from 'vue';
    import {mapState} from "vuex";
    import moment from 'moment';

    import app from "@/application";
    const tsk = new app.Task
    const timedet = new app.TimeDetail

    import TimeNav from '../components/TimeNav.vue'
    import Totalsup from '../components/Totalsup.vue'
    import HourlyTask from '../components/HourlyTask.vue'
    import Tasktimer from '../components/Tasktimer.vue'
    import EditTaskName from '../components/EditTaskname.vue'
    import Note from '../components/Note.vue'
    import DownloadPDF from '../components/DownloadPDF.vue'
    import DownloadCSV from '../components/DownloadCSV.vue'

    export default Vue.extend({
        name: 'ClientContent',
        components: {
            TimeNav,
            Totalsup,
            HourlyTask,
            Tasktimer,
            EditTaskName,
            Note,
            DownloadPDF,
            DownloadCSV
        },

        data() {
            return {
                time: null,
                newtasktext: '',
                amountt: '',
            }
        },
        computed: {
            ...mapState(['activecustomer', 'tasks', 'client', 'runningtasks', 'force', 'currencie']),
        },


        methods: {
            async newtask() {
                if (this.newtasktext != '') {
                    const ress = await tsk.create(this.activecustomer, this.newtasktext )
                    await this.$store.commit('pushNewTask', ress)
                    this.newtasktext = ''
                }
            },
            async playnewtask(taskId: number) {
                const newdet = await timedet.playnNewTask(taskId)
                await this.$store.commit('setRunningTask', newdet)
            },

            async stoptask(taskId: number) {
                const newdetail = await timedet.stopTask(taskId)
                await this.$store.commit('setStopTask', {newdetail: newdetail, taskId: taskId})
            },

            checkactualmonth(datecode: string) {
                const actualdatecode = moment().format('MMYY')
                if (actualdatecode > datecode) return false
                else return true
            },

            async togglehistory(id) {
                const res = await tsk.toggleHistory(id)
                await this.$store.commit('setToggleHistory', { taskId: id, state: res} )
            },

            async togglenote(id) {
                this.$store.commit('switchNotes', id )
            },

            difduration(start, end) {
                const st = moment(start)
                const ed = moment(end)
                const duration = ed.diff(st, "seconds")
                const dateObj = new Date(duration * 1000)
                const hours = dateObj.getUTCHours()
                const minutes = dateObj.getUTCMinutes()
                const seconds = dateObj.getSeconds()
                const timeString = hours.toString().padStart(2, '0') + ':' +
                    minutes.toString().padStart(2, '0') + ':' +
                    seconds.toString().padStart(2, '0')
                return timeString
            },

            amount(start, end, hourly) {
                const timeString = this.difduration(start, end)
                const amountPerHour = parseInt(hourly)
                const time = timeString.split(':').reduce((r, a, i) => r + a * Math.pow(60, -i), 0)
                const result = time * amountPerHour
                return result.toFixed(2)
            },

            deletetask(taskId) {
                this.$modal.show('dialog', {
                    title: 'Borrar',
                    text:  '¿ Quiere borrar esta tarea y todo su detalle ?' ,
                    buttons: [
                        { title: 'Cerrar' },
                        { title: 'Aceptar', handler: () => { this.deletetaskaction(taskId) } }
                    ]
                })
            },

            async deletetaskaction(taskId) {
                await timedet.deleteDetailsFromTask(taskId)
                await tsk.deleteTask(taskId)
                await this.$store.commit('setCurrentCustomer', this.activecustomer)
                await this.$modal.hide('dialog')
            },

            deletedetail(detailId) {
                this.$modal.show('dialog', {
                    title: 'Eliminar fragmento',
                    text:  '¿ Quiere eliminar este fragmento de tiempo ?' ,
                    buttons: [
                        { title: 'Cerrar' },
                        { title: 'Aceptar', handler: () => { this.deletedetailaction(detailId) } }
                    ]
                })
            },

            async deletedetailaction(detailId) {
                await timedet.deleteDetail(detailId)
                await this.$store.commit('setCurrentCustomer', this.activecustomer)
                await this.$modal.hide('dialog')
            },

            tomodifycustomer() {
                this.$store.commit('setView', 'mod-customer')
            },
            format(x) {
                return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".");
            }
        }
    });
</script>


<template>
    <div id="clientcontent">
        <v-dialog/>
        <div class="bar">
            <span @click="tomodifycustomer" class="marginado link">{{$t('Client')}}: <span class="bold">{{client.name}}</span></span>
            <span class="marginado">{{currencie}}/h: <span class="bold">{{client.hourlyRate}}</span></span>
            <time-nav class="push" />
            <span class="marginado bold"> {{format(client.revenue)}} {{currencie}} </span>

            <DownloadPDF v-if="!runningtasks"/>
            <DownloadCSV  v-if="!runningtasks"/>
        </div>

        <div class="inputgroup">
            <div class="labelinput">{{$t('New task')}}:</div>
            <input v-model="newtasktext" v-on:keyup.enter="newtask" type="text" class="inpuntnewtask" ref="inpuntnewtask">
        </div>

        <div v-for="task in tasks" class="taskgroup" :key="task.id">

            <div class="task" v-bind:class="{ active: task.running }">
                <div @click="playnewtask(task.id)" v-show="!task.running" class="player btn" v-if="checkactualmonth(task.datecode)" ><i class="fas fa-play"></i></div>
                <div @click="stoptask(task.id)" class="player btn stop" v-show="task.running" v-bind:class="{ active: !task.running }"><i class="fas fa-pause"></i></div>
<!--                <div class="name">{{task.task}}</div>-->
                <EditTaskName :taskId="task.id" :task="task.task"/>

                <div class="push">
                    <totalsup :taskId="task.id"  v-if="task.running"/>
                    <span v-else v-show="task.revenue>0">
                        <span class="totaltasktimer">{{task.totalduration}} • {{task.revenue}} {{currencie}} </span>
                    </span>
                </div>

                <hourly-task :hourlyRate="client.hourlyRate" :taskId="task.id" v-if="runningtasks==0" />

                <span v-show="task.opencoment==false">
                    <div @click="togglenote(task.id)" v-show="task.note==''" class="openhistory btn "><i class="far fa-comment"></i></div>
                    <div @click="togglenote(task.id)" v-show="task.note!=''" class="openhistory btn "><i class="fas fa-comment"></i></div>
                </span>

                <div @click="togglenote(task.id)" v-show="task.opencoment" class="openhistory btn"><i class="fas fa-angle-double-up"></i></div>

                <div @click="togglehistory(task.id)"  class="openhistory btn cyfirst"><i class="fas fa-list"></i></div>
                <div @click="deletetask(task.id)"  v-if="runningtasks==0" class="openhistory btn cydelete"><i class="fa fa-times-circle"></i></div>
            </div>

            <div class="note" v-show="task.opencoment">
                <note :note="task.note" :taskId="task.id"></note>
            </div>

            <div class="detail" v-show="task.openHistory">
                <div v-for="deta in task.detail" class="itemdetail" :key="deta.id" v-bind:class="{ active: deta.end==0 }">
                    <span class="nombredia"> {{ moment( deta.start ).format('dddd') }} </span>
                    <span class="fecha"> {{ moment(deta.start).format('DD/MM/YY') }} </span>
                    <span class="inicio"><i class="fas fa-play-circle"></i> {{ moment(deta.start).format('H:mm:ss') }}  </span>
                    <span v-if="deta.end==''">
                        <tasktimer  :datestart="deta.start" :taskId="task.id" :hourlyRate="task.hourlyRate" ></tasktimer>
                    </span>
                    <div v-else>
                        <span class="fin"> <i class="fas fa-stop-circle"></i> {{ moment(deta.end).format('H:mm:ss') }} </span>
                        <span class="duracion"> <i class="fas fa-clock"></i> {{ difduration(deta.start, deta.end) }} </span>
                        <span class="hourly" v-if="task.hourlyRate==0"> {{currencie}}/h: {{ client.hourlyRate }}</span>
                        <span class="hourly" v-if="task.hourlyRate!=0"> {{currencie}}/h: {{ task.hourlyRate }}</span>
                        <span class="amount" v-if="task.hourlyRate==0">{{ amount(deta.start, deta.end, client.hourlyRate ) }} {{currencie}} </span>
                        <span class="amount" v-if="task.hourlyRate!=0">{{ amount(deta.start, deta.end, task.hourlyRate ) }} {{currencie}} </span>
                    </div>
                    <span @click="deletedetail(deta.id)" v-if="runningtasks==0" class="push btn deletedetail"> <i class="fas fa-times-circle"></i> </span>
                </div>
                <div class="totals" v-if="!task.running">
                    <span class="totlaltime"  >
                           <span class="totaltasktimer"><i class="fas fa-clock"  style="margin-right:4px"></i>{{ task.totalduration }}</span>
                    </span>
                    <span class="totlarevenue"  v-if="!task.running"> {{ task.revenue }} {{currencie}} </span>
                </div>
            </div>


            </div>


    </div>
</template>

