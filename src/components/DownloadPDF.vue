<script>
    import {mapState} from "vuex";
    import jsPDF from 'jspdf'
    import moment from "moment";
    import app from './../application'


    export default {

        name: 'downloadpdf',
        components: {},

        data() {
            return {}
        },

        computed: {
            ...mapState(['client', 'activecustomer', 'years', 'months', 'currentyear', 'currentmonth']),
        },

         methods: {

            setPDFheader(doc) {
                const ano = this.getyear(this.currentyear)
                const mes = this.getmonth(this.currentmonth)

                doc.setFont("helvetica");
                doc.setFontType("bold");
                doc.setFontSize(16);
                doc.text(this.client.name, 10, 12);
                doc.setFontSize(11);
                doc.setFontType("normal");
                doc.text('Informe tiempos', 10, 18);
                doc.setFontType("bold");

                doc.text(mes + ' - ' + ano, 10, 23);
                doc.setFontSize(9);
                const checkline1 = localStorage.getItem('line1')
                if (checkline1  != null) doc.text(localStorage.getItem('line1'), 140, 12);
                const checkline2 = localStorage.getItem('line2')
                if (checkline2  != null) doc.text(localStorage.getItem('line2'), 140, 17);
                const checkline3 = localStorage.getItem('line3')
                if (checkline3  != null) doc.text(localStorage.getItem('line3'), 140, 22);
            },


            async exportPDF() {

                const doc = new jsPDF({
                    orientation: 'p',
                    unit: 'mm',
                    format: 'a4',
                    putOnlyUsedFonts: true,
                });
                const ano = this.getyear(this.currentyear)
                const mes = this.getmonth(this.currentmonth)

                this.setPDFheader(doc)

                const y = this.currentyear
                let m = this.currentmonth
                m = ('0' + m).slice(-2)
                const datecode = m + y

                const cli = new app.Task
                let tasks = await cli.allTasksFromClient( this.activecustomer );
                tasks = tasks.reverse()
                const det = new app.TimeDetail


                for (let x = 0; x < tasks.length; x++) {

                    const details = await det.allDetailsFromTask( tasks[x].id, datecode)
                    tasks[x].detail = details.reverse()

                }



                let totaltask = 0.0
                let totalduration = 0.0
                let alltask = 0.0
                let allduration = 0.0
                let page = 1
                let line = 32
                for (let x = 0; x < tasks.length; x++) {
                    totaltask = 0.0
                    totalduration = 0.0
                    line += 5
                    doc.text(tasks[x].task, 30, line);
                    line += 5
                    let formated = ''
                    for (let y = 0; y < tasks[x].detail.length; y++) {
                        const st = moment(tasks[x].detail[y].start)
                        const ed = moment(tasks[x].detail[y].end)
                        const duration = ed.diff(st, "seconds")
                        const timeString = moment.utc(duration * 1000).format('HH:mm:ss');

                        let amountPerHour = null

                        if (tasks[x].hourlyRate == 0) {
                            amountPerHour = parseInt(this.client.hourlyRate)
                         } else {
                            amountPerHour = parseInt(tasks[x].hourlyRate)
                        }

                        const time = timeString.split(':').reduce((r, a, i) => r + a * Math.pow(60, -i), 0)
                        const result = (time * amountPerHour)
                        const nres = parseFloat(result)
                        totaltask += nres
                        totalduration += duration
                        formated = moment.utc(totalduration * 1000).format('HH:mm:ss');

                        doc.setFontType("normal");
                        doc.text(moment(tasks[x].detail[y].start).format('dddd'), 30, line)
                        doc.text(moment(tasks[x].detail[y].start).format('DD/MM/YY'), 46, line)
                        doc.text('h/i: ' + moment(tasks[x].detail[y].start).format('H:mm:ss'), 64, line)
                        doc.text('h/f: ' + moment(tasks[x].detail[y].end).format('H:mm:ss'), 84, line)
                        doc.text('tiempo: ' + timeString, 104, line)
                        doc.text('€/h: ' + amountPerHour, 130, line)
                        doc.text('coste:' + result.toFixed(2).toString() + '€', 143, line)

                        line += 5

                        if (line >= 260) {
                            doc.addPage()
                            page++
                            this.setPDFheader(doc)
                            line = 35
                        }

                    }
                    doc.setFontType("bold");
                    doc.text('tiempo: ' + formated + 'h', 104, line)
                    doc.text('coste: ' + totaltask.toFixed(2).toString() + '€', 141, line)
                    alltask += totaltask
                    allduration += totalduration
                    line += 5
                }

                doc.setFontSize(11)
                const formated2 = moment.utc(allduration * 1000).format('HH:mm:ss');
                line += 5
                doc.text('Toal tiempo: ' + formated2 + 'h', 90, line)
                doc.text('           ' + alltask.toFixed(2).toString() + '€', 135, line)


                doc.setFontType("normal");
                for (let z = 1; z <= page; z++) {
                    doc.setPage(z)
                    doc.text('página: (' + z + '/' + page + ')', 95, 290)
                }
                doc.save(this.client.name.replace(/ /g, "-") + '-' + mes + '-' + ano + '.pdf');
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
    <span @click="exportPDF" class="btn dows"><i class="fas fa-file-pdf"></i></span>


</template>
