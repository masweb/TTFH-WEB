<script lang="ts">
    import {mapState} from "vuex";
    import ConfigDB from '../components/ConfigDB.vue'
    import ConfigLabel from '../components/ConfigLabel.vue'
    import {ToggleButton} from 'vue-js-toggle-button'
    import Vue from 'vue'

    Vue.component('ToggleButton', ToggleButton)

    export default Vue.extend({
        name: 'config',
        data() {
            return {
                eljson: null,
                enabled: false,
                file: '',
                lcurrencie: '',
             }
        },
        components: {
            ConfigDB,
            ConfigLabel
        },
        mounted() {
            if (this.theme == 'dark') this.enabled = false
            else this.enabled = true
            this.lcurrencie = this.currencie
            this.$i18n.locale = localStorage.getItem('tthlang')
         },
        computed: {
            ...mapState(['theme', 'langs', 'currencies', 'currencie']),


        },
        watch: {
            enabled() {
                if (this.enabled) {
                    this.$store.commit('setTheme', 'light')
                    localStorage.setItem('themelabel', 'light')
                } else {
                    this.$store.commit('setTheme', 'dark')
                    localStorage.setItem('themelabel', 'dark')
                }
            },
            lcurrencie() {
                localStorage.setItem('ttcurrencie',  this.lcurrencie)
                this.$store.commit('setCurencie', this.lcurrencie )
            }
        },
        methods: {
            setlang() {
                localStorage.setItem('tthlang', this.$i18n.locale)
            }
        }
    });

</script>

<template>
    <div id="config" class="config">
        <div class="container">
            <div class="row">

                <div class="col" style="margin-right: 150px" >
                    <h1>{{$t('Language')}}</h1>
                    <select v-model="$i18n.locale" @change="setlang" class="select-css">
                        <option v-for="(lang, i) in langs" :key="`Lang${i}`" :value="lang">{{ lang }}</option>
                    </select>
                </div>


                <div class="col" >
                    <h1>{{$t('Currencie')}}</h1>
                    <select v-model="lcurrencie"   class="select-css">
                        <option v-for="(mon, i) in currencies" :key="i" :value="mon">{{ mon }}</option>
                    </select>
                </div>
            </div>

            <div class="espaconfig"></div>
            <div class="row">
                <div class="column">
                    <h1>{{$t('Theme')}}</h1>
                    <toggle-button v-model="enabled"
                                   :sync="true" :width="100" :height="50" :speed="200"
                                   :labels="{checked: $t('Dark'), unchecked: $t('Light')}"
                                   :color="{checked: '#222', unchecked: '#eeeeee'}"
                                   :switch-color="{checked: '#eeeeee', unchecked: '#222'}"/>
                </div>
            </div>
            <div class="espaconfig"></div>

            <div class="row">
                <div class="column">
                    <Config-DB/>
                </div>
            </div>
            <div class="espaconfig"></div>

            <div class="row">
                <div class="coluumn">
                    <ConfigLabel/>
                </div>
            </div>
        </div>

    </div>

</template>





