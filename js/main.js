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
        currentActiveScreen: 4,
        formErrors: [],
        // calculation data
        availableMonths: [
            'Mars', 'April', 'Mai'
        ],
        formData: {
            selectMonth: 'April',
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
            this.currentActiveScreen = this.currentActiveScreen - 1;
            this.updateProgressBar(this.currentActiveScreen);
        },
        resetForm: function () {
            this.currentActiveScreen = 1;
            this.regularMonthlyIncome = '';
            this.salesDiff = '';
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
                let sd = (1 - this.formData.afterCoronaMonthlyIncome / this.formData.regularMonthlyIncome) * 100;
                if (sd < 0) {
                    this.formErrors.push("Salgsforskjellen må være positiv");
                    this.formData.salesDiffIsPositive = false;
                } else if (sd > 0 && sd < 20) {
                    this.formErrors.push("Forskjellen i salg må være 20% eller mer");
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

            if (this.formData.govAid.closedByGov) {
                val = this.formData.operationExpense * (this.formData.salesDiff / 100) * this.formData.govAid.aidPercent;
            } else {
                val = (
                    (((this.formData.salesDiff / 100) * this.formData.operationExpense) - 10000) * this.formData.govAid.aidPercent
                )
            }

            if (this.formData.operationExpense) {
                return val.toFixed(2);
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
