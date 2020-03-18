<script lang="ts">
    import {mapState} from "vuex";
    import moment from "moment";

    export default {
        name: 'timenav',
        data() {
            return {}
        },

        computed: {

            ...mapState(['years', 'months', 'currentyear', 'currentmonth', 'runningtasks']),

            topedown() {
                if (this.currentyear == 20 && this.currentmonth == 1) return false
                else return true
            },

            pasado() {
                const nowdatecode = moment().format('YYMM')
                const y = this.currentyear
                let m = this.currentmonth
                m = ('0' + m).slice(-2)
                const datecode = y + m
                if (nowdatecode > datecode) return true
                else return false
            },

        },


        watch: {
            runningtasks() {
                this.$forceUpdate()
            },
        },

        methods: {

            getmonth(month) {
                const found = this.months.find(m => m.id === parseInt(month));
                return this.$t(found.name)
    },

            getyear(year) {
                const found = this.years.find(y => y.id === parseInt(year))
                return found.name
            },

            nextmonth() {
                this.$store.commit('nextMonth')
            },

            prevmonth() {
                this.$store.commit('prevMonth')
            },
        },
    }

</script>


<template>
    <div id="timenav">
        <!--        <div v-if="runningtasks==0">-->
        <div>
            <span @click="prevmonth" v-show="topedown" class="btn">
                <span>
                    <i class="fa fa-caret-left"></i>
                </span>
            </span>

            <span> {{getmonth(currentmonth)}} </span>
            <span> {{getyear(currentyear)}} </span>

            <span @click="nextmonth" v-if="pasado" class="btn">
                <span>
                    <i class="fa fa-caret-right"></i>
                </span>
            </span>
            <span v-show="!pasado" class="btnhidden"> </span>
        </div>
    </div>
</template>

