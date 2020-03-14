<script lang="ts">
    import {mapState} from "vuex";
    import ConfigDB from '../components/ConfigDB.vue'
    import ConfigLabel from '../components/ConfigLabel.vue'
    import { ToggleButton } from 'vue-js-toggle-button'
    import Vue from 'vue'
    Vue.component('ToggleButton', ToggleButton)

    export default Vue.extend({
        name: 'config',
        data() {
            return {
                eljson: null,
                enabled: false,
                file: ''
            }
        },
        components: {
            ConfigDB,
            ConfigLabel
        },
        mounted() {
            if(this.theme=='dark') this.enabled = false
            else this.enabled = true
         },
        computed: {
            ...mapState(['theme']),


        },
        watch: {
            enabled() {
                if(this.enabled) {
                    this.$store.commit('setTheme', 'light')
                    localStorage.setItem('themelabel', 'light' )
                 } else {
                    this.$store.commit('setTheme', 'dark')
                    localStorage.setItem('themelabel', 'dark' )
                 }
            }
        },
        methods: {

        }
    });

</script>

<template  >
    <div id="config" class="config">
        <div class="container">
            <div class="row">
                <div class="coluumn">
                    <ConfigLabel/>
                </div>
            </div>
            <div class="row">
                <div class="column">
                    <h1>Tema</h1>
                    <toggle-button v-model="enabled"
                                   :sync="true"  :width="100" :height="50" :speed="200"
                                   :labels="{checked: 'oscuro', unchecked: 'claro'}"
                                   :color="{checked: '#222', unchecked: '#eeeeee'}"
                                   :switch-color="{checked: '#eeeeee', unchecked: '#222'}"
                    />
                </div>
                <div class="column">
                    <Config-DB />
                </div>

            </div>
        </div>

    </div>

</template>
















