<script lang="ts">
    import Timer from 'easytimer'
    import {mapState} from "vuex";
    import moment from 'moment';

    export default {
        name: 'tasktimer',

        data() {
            return {
                time: null,
                amount: null,
                days: null,
                hourly: null
            }
        },

        props: {
            datestart: {
                type: String,
            },
            taskId: {
                type: Number,
            },
        },

        computed: {
            ...mapState([ 'tasks', 'hourlyRate' ])
        },

        mounted() {
            for (let x = 0; x < this.tasks.length; x++)
                if (this.tasks[x].id === this.taskId)
                    if (this.tasks[x].hourlyRate == 0)  this.hourly = this.hourlyRate
                    else this.hourly = this.tasks[x].hourlyRate
            this.InitTimer()
        },

        methods: {

            InitTimer() {
                const date1 = moment()
                const date2 = moment(this.datestart)
                const diff = date1.diff(date2);

                const seconds = Math.floor((diff / 1000) % 60),
                    minutes = Math.floor((diff / (1000 * 60)) % 60),
                    hours = Math.floor((diff / (1000 * 60 * 60)) % 24)

                const aTimer = new Timer()

                aTimer.start({
                    precision: 'seconds',
                    startValues: {hours: hours, minutes: minutes, seconds: seconds}
                })
                // eslint-disable-next-line @typescript-eslint/no-this-alias
                const _this = this
                const hourly = this.hourlyRate
                let amountPerHour
                let time
                aTimer.addEventListener('secondsUpdated', function () {
                    _this.time = aTimer.getTimeValues().toString()
                    amountPerHour = hourly
                    time = aTimer.getTimeValues().toString().split(':').reduce((r, a, i) => r + a * Math.pow(60, -i), 0)
                    _this.amount = (time * amountPerHour).toFixed(2)
                })

            }
        }
    }
</script>

<template>
    <div id="tasktimer">
        <span class="fin"></span>
        <i class="fas fa-cog fa-spin" style="margin-right:4px"></i>
        <span v-if="days>0"> {{days}}
                <span v-if="days>1">días</span>
                <span v-else>día</span>
        </span>
        <span class="timer">{{time}}</span>

        <span class="hourlyt">€/h:&nbsp;{{hourly}}</span>
        <span class="amount">  {{amount}} € </span>
    </div>
</template>

<style lang="scss" scoped>
    #tasktimer {

        .timer {
            width: 70px;
            display: inline-block;
            font-weight: 500;
        }

        .hourlyt {
            width: 56px;
            display: inline-block;
            margin-left: 0px;
        }

        .amountr {
            width: 64px;
            font-weight: 500;
            display: inline-block;
            text-align: right;
         }

    }

</style>
