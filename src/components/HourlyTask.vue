<script lang="ts">
    import { mapState } from "vuex";
    import app from './../application'
    const tsk = new app.Task

    export default {
        name: 'hourlytask',

        data() {
            return {
                newhourly: 0,
                showedit: false,
                istaskprice: null,
            }
        },

        props: {
            hourlyRate: Number,
            taskId: Number,
        },

        created() {
            this.checktask()
        },

        computed: {
            ...mapState(['tasks', 'activecustomer', 'currencie']),
        },

        watch: {
            tasks() {
                this.checktask()
                this.$nextTick(() =>this.$forceUpdate())
             },
        },

        methods: {

            checktask() {
                this.tasks.find((t, i) => {
                    if (t.id === this.taskId) {
                        if(this.tasks[i].hourlyRate == ''){
                            this.newhourly =  this.hourlyRate
                            this.istaskprice = false
                        } else {
                            this.newhourly = this.tasks[i].hourlyRate
                            this.istaskprice = true
                        }
                    }
                })
            },

            async settaskhourly() {
                await tsk.modHourlyTask(this.taskId, this.newhourly)
                await this.$store.commit('setCurrentCustomer', this.activecustomer)
                this.showedit = false
                this.checktask()
            },

            async sethourlytozero() {
                await tsk.setHourlyToZero(this.taskId)
                this.$store.commit('setCurrentCustomer', this.activecustomer)
                this.showedit = false
                this.checktask()
            },

            switchedit() {
                this.showedit = !this.showedit
                this.$nextTick(() => this.$refs.hourlychangerinput.focus())
            },

        }
    }

</script>





<template  >
    <div id="hourlytask">
        <span @click="switchedit" v-show="!showedit" class="ratechanger btn">
            <span v-show="!istaskprice">
                <i class="fas fa-lock"></i>
            </span>
            <span v-show="istaskprice">
                <i class="fas fa-lock-open"></i>
            </span>
            {{newhourly}} {{currencie}}/h.
        </span>

        <span v-show="showedit" class="ratechanger" >
            <span class="btn">
               <span @click="switchedit">
                    <i class="fas fa-times-circle"></i>
                </span>
                 <span @click="sethourlytozero"  v-show="istaskprice" class="cycancel">
                    <i class="fas fa-lock"></i>
                </span>
            </span>
            <input v-model="newhourly" v-on:keyup.enter="settaskhourly"  type="number"  ref="hourlychangerinput">
{{currencie}}/h.
        </span>

    </div>
</template>
