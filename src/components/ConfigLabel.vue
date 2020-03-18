<script lang="ts">
    import Vue from "vue";

    export default Vue.extend({
        name: 'ConfigLabel',

        data() {
            return {
                line1: '',
                line2: '',
                line3: '',
            }
        },
        mounted() {
            const checkline = localStorage.getItem('line1')
            if (checkline != null) {
                const l1 = localStorage.getItem('line1')
                const l2 = localStorage.getItem('line2')
                const l3 = localStorage.getItem('line3')
                if (l1 != null) this.line1 = l1
                if (l2 != null) this.line2 = l2
                if (l3 != null) this.line3 = l3
            }

        },
        computed: {},
        watch: {},
        methods: {
            savelines()  {
                localStorage.setItem('line1', this.line1 )
                localStorage.setItem('line2', this.line2 )
                localStorage.setItem('line3', this.line3 )
                this.$notify({ group: 'app', type: 'success',  text: 'Datos guardados' })
            }
        }
    })


</script>


<template>
    <div id="ConfigLabel" style="margin-bottom: 100px">
        <div class="container">
            <div class="row">
                <div class="column" style="padding-right: 50px">
                    <h1>{{$t('PDF Header')}}</h1>
                    <div class="label">{{$t('Line')}} 1</div>
                    <input v-model="line1" type="text" class="configinput">
                    <div class="label">{{$t('Line')}} 2</div>
                    <input v-model="line2"  type="text" class="configinput">
                    <div class="label">{{$t('Line')}} 3</div>
                    <input v-model="line3"  type="text" class="configinput">
                    <br>
                    <br>
                    <div @click="savelines" class="btn expimp">{{$t('Save')}}</div>
                </div>
                <div class="column"></div>
            </div>
        </div>

    </div>

</template>
