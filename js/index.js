var APIurl = "https://api.github.com/search/repositories?q=github-ynov-vue";

var app = new Vue({
    el: '#app',
    data: {
        listeRepo: [],
        listeUtilisateur: [],
        projects: ["github-ynov-vue"],
        selectUser: '',
        selectProject: ''
    },

    mounted() {
        fetch(APIurl, {
            headers: {
                "Authorization": "Basic bWFlbDYxOmE3dzFzNWU5YzM="
            },
            method: "GET"
        })
            .then(response => response.json())
            .then(data => {
                this.listeUtilisateur = data.items
            })
    },

    method:{
        
    }
});


// fetchData: function () {
//     var xhr = new XMLHttpRequest()
//     var self = this
//     xhr.open('GET', apiURL + self.currentBranch)
//     xhr.onload = function () {
//         self.commits = JSON.parse(xhr.responseText)
//         console.log(self.commits[0].html_url)
//     }
//     xhr.send()
// }
// mounted (){
//     axios.get(
//          APIurl,
//         {headers: {
//                 "Authorization" : token
//             }
//         }
//     )
//         .then( response => {
//                 this.info = response.data;
//             },
//             (error) => {
//                 var status = error.response.status
//             }
//         );
// }
// ,
    // filters: {
    //     currencydecimal (value) {
    //         return value.toFixed(2)
    //     }
    // },