import {myLoginRoutine} from "js/callAPI.js"
var APIurl = "https://api.github.com/repos/Dakistos/github-ynov-vue";
var token = ":3d3a9e363fe77f7ca5b69a9a10af8a29b0a6cca6";

var app = new Vue({
    el: '#app',
    data: {
        branches: ['master'],
        currentBranch: 'master',
        commits: null
    },

    created: function(){
        this.fetchData()
    },
    watch:{
        currentBranch: 'fetchData'
    },

    method:{
        fetchData: function () {
            var xhr = new XMLHttpRequest()
            var self = this
            xhr.open('GET', apiURL + self.currentBranch)
            xhr.onload = function () {
                self.commits = JSON.parse(xhr.responseText)
                console.log(self.commits[0].html_url)
            }
            xhr.send()
        }
    },
    // filters: {
    //     currencydecimal (value) {
    //         return value.toFixed(2)
    //     }
    // },
    // mounted(){
    //     axios
    //         .get("https://api.github.com/repos/Dakistos/github-ynov-vue")
    //         .then(response => (this.info = response.data.name))
    // }
})