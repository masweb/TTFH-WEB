<script lang="ts">
    import {mapState} from "vuex";
    import Vue from "vue";

    export default Vue.extend({
        name: 'toolbar',
        computed: {
            ...mapState(["currentview"]),
        },
    });

</script>

<template>
    <div id="toolbar" class="toolbar">
        <span @click="$store.commit('setView', 'new-customer' )" class="btn newclient">
            <i class="fas fa-plus" ></i>
        </span>

        <span @click="$store.commit('setView', 'config' )"  class="btn conf">
            <i class="fas fa-cog"></i>
        </span>

    </div>
</template>

