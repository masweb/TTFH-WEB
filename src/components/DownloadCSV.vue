<script>
    import { mapState } from "vuex"
    import { Parser } from 'json2csv'
    const fields = ['task', 'detail.start', 'detail.end'];
    const json2csvParser = new Parser({ fields, unwind: ['detail'] });

    export default {
        name: 'downloadcsv',
        data() {
            return {
                csv: null,
            }
        },
        mounted() {
            this.loadcsv()

        },
        computed: {
            ...mapState([ 'tasks', 'client', 'activecustomer', 'years', 'months', 'currentyear', 'currentmonth']),

        },
        watch: {
            tasks() {
                this.loadcsv()
            },
        },
        methods: {
            loadcsv() {
                this.csv = []
                console.log('this.tasks', this.tasks)
                this.csv = json2csvParser.parse(this.tasks);
            },

            downloadString() {
                const ano = this.getyear(this.currentyear)
                const mes = this.getmonth(this.currentmonth)
                const str = this.client.name.replace(/ /g,"-") + '-' + mes + '-' + ano + '.csv'
                const blob = new Blob([this.csv], { type: 'csv' });
                const a = document.createElement('a');
                a.download = str
                a.href = URL.createObjectURL(blob);
                a.dataset.downloadurl = [ 'csv', a.download, a.href].join(':');
                a.style.display = "none";
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                setTimeout(function() { URL.revokeObjectURL(a.href); }, 1500);
            },
            getmonth(month) {
                return this.months.find(m => m.id === month).name
            },
            getyear(year) {
                return this.years.find(y => y.id === year).name
            },
        }
    }

</script>


<template>

        <span class="btn dows"  @click="downloadString"><i class="fas fa-file-csv"></i></span>



</template>
