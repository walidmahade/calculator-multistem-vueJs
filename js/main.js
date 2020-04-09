console.log("Start code");
// ---------- Components
// Vue.component('');

// --------- vue instance for header
let headerBar = new Vue({
    el: '.header',
    data: {
        progress: 25
    },
    methods: {
        resetForm: function () {
            calculator.resetForm()
        }
    }
});

// --------- vue instance for calculator
let calculator = new Vue({
    el: '#calculator',
    data: {
        totalScreens: 0,
        currentActiveScreen: 1,
        formErrors: [],
        // calculation data
        availableMonths: [
            'Mars', 'April', 'Mai'
        ],
        formData: {
            selectMonth: 'April',
            regularMonthlyIncome: '',
            afterCoronaMonthlyIncome: '',
            salesDiff: false,
        }
    },
    methods: {
        goNext: function () {
            // console.log(e.target)
            // let self = this;
            let testesPassed = this.currentActiveScreen < this.totalScreens;
            // console.log(testesPassed);
            // check if we should ge next
            // change active slide indicator
            if (testesPassed)
                this.currentActiveScreen = this.currentActiveScreen + 1;
            this.updateProgressBar(this.currentActiveScreen);
        },
        goPrev: function () {
            this.currentActiveScreen = this.currentActiveScreen - 1;
            this.updateProgressBar(this.currentActiveScreen);
        },
        resetForm() {
            this.currentActiveScreen = 1;
            this.regularMonthlyIncome = '';
            this.salesDiff = '';
            this.formErrors = [];
            this.updateProgressBar(this.currentActiveScreen);
        },
        updateProgressBar(screen) {
            let barProgress = screen * 25;
            headerBar.progress = barProgress;
            headerBar.$refs.progressBar.style.setProperty('--progress-bar-width', barProgress + "%");
        },
        // calculateSalesDiff() {
        //     // console.log('fired');
        //     let salesDiff = (1 - this.formData.afterCoronaMonthlyIncome / this.formData.regularMonthlyIncome) * 100;
        //     this.formData.salesDiff = salesDiff.toFixed(2);
        // }
        // incrementRegularMonthlyIncome() {
        //     this.regularMonthlyIncome = this.regularMonthlyIncome ? this.regularMonthlyIncome + 50000 :  50000
        // },
        // decrementRegularMonthlyIncome() {
        //     this.regularMonthlyIncome = this.regularMonthlyIncome > 50000 ? this.regularMonthlyIncome - 50000 :  0
        // }
    },
    computed: {
        salesDiff: function () {
            this.formErrors = [];
            if (this.formData.afterCoronaMonthlyIncome && this.formData.regularMonthlyIncome) {
                let sd = (1 - this.formData.afterCoronaMonthlyIncome / this.formData.regularMonthlyIncome) * 100;
                if (sd < 0) {
                    this.formErrors.push("Salgsforskjellen må være positiv");
                    this.formData.salesDiff = false;
                } else if (sd > 0 && sd < 20) {
                    this.formErrors.push("Forskjellen i salg må være 20% eller mer");
                    this.formData.salesDiff = false;
                } else {
                    this.formData.salesDiff = true
                }
                return sd.toFixed(2);
            } else {
                this.formData.salesDiff = false;
                return '';
            }
        }
    },
    created: function () {
        this.totalScreens = document.querySelectorAll('.screen').length;
        console.log(this.totalScreens);
    }
});
