console.log("Start code");
// ---------- Components
Vue.component('')

// --------- vue instance for header
let headerBar = new Vue({
    el: '.header',
    data: {
        progress: 0
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
        currentActiveScreen: 5,
        regularMonthlyIncome: '',
        salesDiff: '',
    },
    methods: {
        goNext: function (e) {
            // console.log(e.target)
            // let self = this;
            let testesPassed = this.currentActiveScreen < this.totalScreens;
            // console.log(testesPassed);
            // check if we should ge next
            // change active slide indicator
            if (testesPassed)
                this.currentActiveScreen = this.currentActiveScreen + 1
        },
        resetForm() {
            this.currentActiveScreen = 1
        },
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
        // console.log(this.totalScreens);
        this.totalScreens = document.querySelectorAll('.screen').length;
    }
});
