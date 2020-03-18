<script>
    import Timer from 'easytimer'
    import {mapState} from "vuex";
    import moment from 'moment';
    import app from './../application'
    const tsk = new app.Task
    const det = new app.TimeDetail

    export default {
        name: 'totalsup',

        data() {
            return {
                time: null,
                amount: null,
             }
        },

        props: {
            taskId: {
                type: Number,
            },

        },

        mounted() {
            this.InitTimer()
        },

        computed: {
            ...mapState(['hourlyRate', "datecode", "currencie"]),
        },

        methods: {

            async InitTimer() {

                const task  = await tsk.getTask(this.taskId)
                let hourly = 0
                if(task.hourlyRate == 0) hourly = this.hourlyRate
                else  hourly = task.hourlyRate

                const taskdetails = await det.allDetailsFromTask( this.taskId, this.datecode)

                let totalduration = 0
                let diff = 0

                for (let i = 0; i < taskdetails.length; i++) {
                    if (taskdetails[i].end != '') {
                        const st = moment(taskdetails[i].start)
                        const ed = moment(taskdetails[i].end)
                        const duration = ed.diff(st)
                        totalduration += duration
                    }
                    else {
                        const date1 = moment()
                        const date2 = moment(taskdetails[i].start)
                        diff = date1.diff(date2)
                        totalduration += diff
                    }
                }

                const seconds = Math.floor((totalduration / 1000) % 60),
                    minutes = Math.floor((totalduration / (1000 * 60)) % 60),
                    hours = Math.floor((totalduration / (1000 * 60 * 60)) % 24)

                const aTimer = new Timer()
                aTimer.start({
                    precision: 'seconds',
                    startValues: {hours: hours, minutes: minutes, seconds: seconds}
                })

                // eslint-disable-next-line @typescript-eslint/no-this-alias
                const _this = this
                let time
                aTimer.addEventListener('secondsUpdated', function () {
                    _this.time = aTimer.getTimeValues()
                    time = aTimer.getTimeValues().toString().split(':').reduce((r, a, i) => r + a * Math.pow(60, -i), 0)
                    _this.amount = (time * hourly).toFixed(2)
                })
            },


        }
    }
</script>

<template>
    <div   >

        <i class="fas fa-cog fa-spin" style="margin-right:4px"></i>
        <span class="ttimer">{{time}}</span>   •
        <span class="totlarevenue">{{amount}} <span style="margin-right: 10px">{{currencie}} </span></span>

      </div>
</template>

