<script>
    import {mapState} from "vuex";
    import app from './../application'
    const cli = new app.Client

    export default {

        name: 'modcustomer',

        data() {
            return {
                customertext: null,
                customerhourlyrate: null,
                error: null,
            }
        },

        computed: {
            ...mapState(['client']),

        },

        created() {
            this.customertext = this.client.name
            this.customerhourlyrate = this.client.hourlyRate
            this.$nextTick(() => this.$refs.inpuntnewtask.focus())
        },

        methods: {
            async modcustomer() {
                if(this.customertext=='') {
                    this.error = 'Nombre de Cliente necesario'
                    return
                }
                if(this.customerhourlyrate=='') {
                    this.error = 'Euros por hora necesario '
                    return
                }
                  await cli.modClient(this.client.id, this.customertext,  this.customerhourlyrate )
                  await this.$store.commit('setModCustomer', {  name:  this.customertext, hourlyRate:  this.customerhourlyrate } )
                  await this.$store.commit('setCurrentCustomer',  this.client.id )
            }
        },

    }
</script>


<template>
    <div id="modcustomer" class="hello">

        <div class="inputgroup">
            <div class="labelinput">cliente:</div>
            <input v-model="customertext" type="text" v-on:keyup.enter="modcustomer" class="inpuntnewtask" ref="inpuntnewtask">
        </div>

        <div class="inputgroup">
            <div class="labelinput">€/h:</div>
            <input v-model="customerhourlyrate" v-on:keyup.enter="modcustomer" type="number" class="inpuntnewtask">
        </div>

        <div class="error">{{error}}</div>

    </div>
</template>

