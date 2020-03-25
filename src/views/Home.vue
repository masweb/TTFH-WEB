<script lang="ts">
    import Vue from 'vue';

    export default Vue.extend({
        name: 'home',
        props: {},
        methods: {}
    });
</script>


<template>
    <div id="home" >
        <div class="container">
            <div class="imcontainer">
                <h1>Tasks Timer for Humans</h1>
                <img src="../assets/logo-ttfh.png">
                <h5> {{$t('if you work')}} </h5>
                <h5> {{$t('Simple application')}} </h5>
            </div>
            <h4>{{$t('Functionalities')}}:</h4>

            <div class="row">
                <div class="col-6">
                    <ul>
                        <li>{{$t('Languages')}}</li>
                        <li>{{$t('Currencies')}}: €, &, $, ¥, Kr, Fr, ₩, ₸, ₮, ₴, ฿, ₽, ₱, R$.</li>
                        <li>{{$t('Detailed PDF')}}</li>
                        <li>{{$t('CSV export')}}</li>
                        <li>{{$t('Light or dark theme')}}</li>
                        <li>{{$t('Customer: create')}}</li>
                        <li>{{$t('Task: create')}}</li>
                     </ul>
                </div>
                <div class="col-6">
                    <ul>
                        <li>{{$t('Comments per task')}}</li>
                        <li>{{$t('Automatic recording')}}</li>
                        <li>{{$t('Display of time')}}</li>
                        <li>{{$t('Recalculation')}}</li>
                        <li>{{$t('Historical navigation')}}</li>
                        <li>{{$t('ImportExportJSON')}}</li>
                     </ul>
                </div>
            </div>
        </div>
    </div>
</template>

