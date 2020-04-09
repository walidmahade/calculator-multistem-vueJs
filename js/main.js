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
            selectMonth: 'Mars',
            regularMonthlyIncome: '',
            afterCoronaMonthlyIncome: '',
            salesDiffIsPositive: false,
            salesDiff: '',
            operationExpense: '',
            govAid: {
                closedByGov: '',
                aidPercent: 0
            }

        }
    },
    methods: {
        goNext: function () {
            this.formErrors = [];
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
            this.formErrors = [];
            this.currentActiveScreen = this.currentActiveScreen - 1;
            this.updateProgressBar(this.currentActiveScreen);
        },
        resetForm: function () {
            this.currentActiveScreen = 1;
            this.formData.selectMonth = 'Mars';
            this.formData.regularMonthlyIncome = '';
            this.formData.afterCoronaMonthlyIncome = '';
            this.formData.salesDiffIsPositive = false;
            this.formData.salesDiff = '';
            this.formData.operationExpense = '';
            this.formData.govAid.closedByGov = '';
            this.formData.govAid.aidPercent = 0;
            this.formErrors = [];
            this.updateProgressBar(this.currentActiveScreen);
        },
        updateProgressBar: function(screen) {
            let barProgress = screen * 25;
            headerBar.progress = barProgress;
            headerBar.$refs.progressBar.style.setProperty('--progress-bar-width', barProgress + "%");
        },
        wasClosedByGov: function (test) {
            if (test) {
                this.formData.govAid.aidPercent = .9;
                this.formData.govAid.closedByGov = test // boolean
            } else {
                this.formData.govAid.aidPercent = .8;
                this.formData.govAid.closedByGov = test // boolean
            }
            this.goNext();
        }
    },
    computed: {
        salesDiff: function () {
            this.formErrors = [];
            if (this.formData.afterCoronaMonthlyIncome && this.formData.regularMonthlyIncome) {
                let sd = Math.round((1 - this.formData.afterCoronaMonthlyIncome / this.formData.regularMonthlyIncome) * 100);
                if (sd < 0) {
                    this.formErrors.push("Salgsforskjellen må være positiv");
                    this.formData.salesDiffIsPositive = false;
                } else if (sd > 0 && sd < 20 && this.formData.selectMonth === 'Mars') {
                    console.log(sd<20, "----", sd);
                    this.formErrors.push("Nedgangen i omsettning må være 20% eller mer ssss");
                    this.formData.salesDiffIsPositive = false;
                } else if (sd > 0 && sd < 30 && this.formData.selectMonth !== 'Mars') {
                    this.formErrors.push("Nedgangen i omsettning må være 30% eller mer");
                    this.formData.salesDiffIsPositive = false;
                } else {
                    this.formData.salesDiffIsPositive = true;
                }
                this.formData.salesDiff = sd.toFixed(2);
                return sd.toFixed(2);
            } else {
                this.formData.salesDiffIsPositive = false;
                this.formData.salesDiff = '';
                return '';
            }
        },
        canApplyFor: function () {
            let val;
            this.formErrors = [];

            if (this.formData.govAid.closedByGov) {
                val = this.formData.operationExpense * (this.formData.salesDiff / 100) * this.formData.govAid.aidPercent;
            } else {
                val = (
                    (this.formData.salesDiff / 100) * (this.formData.operationExpense - 10000) * this.formData.govAid.aidPercent
                )
            }

            if (this.formData.operationExpense) {
                if (Math.round(val) < 5000)
                    this.formErrors.push('Det er satt en minstegrense for utbetaling, slik at beregnet støttebeløp under 5000 kroner utbetales ikke.');
                return Math.round(val);
            } else {
                return '';
            }
        }
    },
    created: function () {
        this.totalScreens = document.querySelectorAll('.screen').length;
        console.log(this.totalScreens);
    }
});
