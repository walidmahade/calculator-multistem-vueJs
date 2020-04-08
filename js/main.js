console.log("Start code");
// ---------- Components
// Vue.component('');

// --------- vue instance for header
let headerBar = new Vue({
    el: '.header',
    data: {
        progress: 20
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
        regularMonthlyIncome: '',
        salesDiff: '',
        // calculation data
        availableMonths: [
            'march', 'april', 'may'
        ],
        formData: {
            selectMonth: 'april'
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
            this.updateProgressBar(this.currentActiveScreen);
        },
        updateProgressBar(screen) {
            let barProgress = screen * 20;
            headerBar.progress = barProgress;
            headerBar.$refs.progressBar.style.setProperty('--progress-bar-width', barProgress + "%");
        }
        // incrementRegularMonthlyIncome() {
        //     this.regularMonthlyIncome = this.regularMonthlyIncome ? this.regularMonthlyIncome + 50000 :  50000
        // },
        // decrementRegularMonthlyIncome() {
        //     this.regularMonthlyIncome = this.regularMonthlyIncome > 50000 ? this.regularMonthlyIncome - 50000 :  0
        // }
    },
    computed: {

    },
    created: function () {
        this.totalScreens = document.querySelectorAll('.screen').length;
        console.log(this.totalScreens);
    }
});
