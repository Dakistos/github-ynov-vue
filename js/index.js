// Vue.filter('formatDate', function(value) {
//     if (value) {
//         return moment(String(value)).format('DD/MM/YYYY')
//     }
// });

// Vue.use(require('vue-moment'));
// import moment from 'moment';

var app = new Vue({

    el: '#app',

    data: {
        selectedUser: '',
        selectedProject: '',
        projects: ["github-ynov-vue"],
        userList: [
            "mathiasLoiret",
            "Mokui",
            "etienneYnov",
            "gfourny",
            "mael61",
            "alixnzt",
            "mcourant",
            "raphaelCharre",
            "AlexDesvallees",
            "ClementCaillaud",
            "benjaminbra",
            "Nair0fl",
            "Killy85",
            "msaintmartin",
            "sfongue",
            "rudy8530",
            "Dakistos",
            "Coblestone",
            "BenoitCochet",
            "thomaspich",
            "TeofiloJ",
            "maximerolland",
            "LordInateur",
            "KevinPautonnier",
            "AntoineGOSSET"
        ],
        commitList: [],
        repositoryList: true,
        repositoryUserSelected: false,
        startDate: '',
        endDate: '',
        repoList: [],
    },

    // filter: {
    //     moment: function (date) {
    //         return moment(date).format('MMMM Do YYYY, h:mm:ss a');
    //     }
    // },

    mounted() {
        this.getAllUser();
    },


    methods: {
        getRepo() {
            if (this.selectedUser == "Tous") {
                this.getAllUser();
            } else {
                this.getUserInfo();
            }
        },


        getAllUser: function () {
            var dateDebut = this.startDate;
            var dateFin = this.endDate;


            this.projects.forEach((projet) => {
                axios.defaults.headers.common['Authorization'] = "Basic bWFlbDYxOmE3dzFzNWU5YzM=";
                axios({method: "GET", "url": "https://api.github.com/search/repositories?q=" + projet})
                    .then((result) => {
                        //user info
                        this.repoList = result.data.items
                        this.repoList.forEach(repo => {
                            var person = {
                                login: repo.owner.login,
                                url: repo.html_url,
                                commitAll: []
                            }
                            axios({method: 'GET', url: "https://api.github.com/repos/" + repo.full_name + "/commits"})
                                .then(response => {
                                    response.data.forEach(data => {
                                        //commits
                                        var commit = {
                                            dateCommit: data.commit.author.date,
                                            message: data.commit.message,
                                            commitUrl: data.html_url
                                        };
                                        if(dateDebut <= commit.dateCommit && dateFin >= commit.dateCommit){
                                            person.commitAll.push(commit);
                                        } else if(dateDebut <= commit.dateCommit && dateFin == ""){
                                            person.commitAll.push(commit)
                                        }
                                    })
                                })
                            // axios({method: 'GET', url:"\"https://github.com/repos/octokit.rb/blob/master/README.md"})
                            this.commitList.push(person);
                            // this.repositoryList = true;
                            // this.repositoryUserSelected = false;
                        })
                    })
            })
        },

        getUserInfo: function () {
            var selectedUser = this.selectedUser;
            var selectedProjet = this.selectedProject;
            var dateDebut = this.startDate;
            var dateFin = this.endDate;
            this.commitList = [];

            axios({method: "GET", "url": "https://api.github.com/search/repositories?q=" + selectedProjet})
                .then((result) => {
                    this.repoList = result.data.items
                    this.repoList.forEach(repo => {
                        if (repo.owner.login === selectedUser) {
                            var person = {
                                login: repo.owner.login,
                                url: repo.html_url,
                                commitAll: []
                            }
                            axios({method: "GET", "url": "https://api.github.com/repos/" + repo.full_name + "/commits"})
                                .then(result => {
                                    result.data.forEach(data => {
                                        var commit = {
                                            dateCommit: data.commit.author.date,
                                            message: data.commit.message,
                                            commitUrl: data.html_url
                                        }
                                        if(dateDebut <= commit.dateCommit && dateFin >= commit.dateCommit){
                                            person.commitAll.push(commit);
                                            console.log(commit.dateCommit);
                                        } else if(dateDebut <= commit.dateCommit && dateFin == ""){
                                            person.commitAll.push(commit)
                                            console.log(commit.dateCommit);
                                        }
                                    })
                                })
                            this.commitList.push(person);
                            this.repositoryList = false;
                            this.repositoryUserSelected = true;
                        }
                    })
                })
        },

        filterDate: function () {

        }
    }

});

