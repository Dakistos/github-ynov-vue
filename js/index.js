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

    mounted() {
        // this.getAllUser();
    },


    methods: {
        // getRepo() {
        //     if (this.selectedUser === "Tous") {
        //         this.getAllUser();
        //     } else {
        //         this.getUserInfo();
        //     }
        // },


        getAllUser: function () {
            var selectedUser = this.selectedUser;
            var selectedProjet = this.selectedProject;
            var dateDebut = this.startDate;
            var dateFin = this.endDate;
            this.commitList = [];




            // this.projects.forEach((projet) => {
                axios.defaults.headers.common['Authorization'] = "Basic bWFlbDYxOmE3dzFzNWU5YzM=";
                axios({method: "GET", "url": "https://api.github.com/search/repositories?q=" + selectedProjet})
                    .then((result) => {
                        //user info
                        this.repoList = result.data.items
                        this.repoList.forEach(repo => {
                            if(this.selectedUser == "Tous"){
                                var person = {
                                    login: repo.owner.login,
                                    url: repo.html_url,
                                    commitAll: []
                                }
                                axios({method: 'GET', url: "https://api.github.com/repos/" + repo.full_name + "/commits"})
                                    .then(response => {
                                        response.data.forEach(data => {
                                            //commits
                                            var commitDate = data.commit.author.date;
                                            var commit = {
                                                newDateCommit: moment(commitDate).format('DD/MM/YYYY'),
                                                message: data.commit.message,
                                                commitUrl: data.html_url
                                            };
                                            if (dateDebut <= commitDate && dateFin >= commitDate) {
                                                person.commitAll.push(commit);
                                            } else if (dateDebut <= commitDate && dateFin == "") {
                                                person.commitAll.push(commit)
                                            }
                                        })
                                    })
                                this.commitList.push(person);

                            } else if(repo.owner.login == selectedUser){
                                var person = {
                                    login: repo.owner.login,
                                    url: repo.html_url,
                                    commitAll: []
                                }
                                axios({method: "GET", "url": "https://api.github.com/repos/" + repo.full_name + "/commits"})
                                    .then(result => {
                                        result.data.forEach(data => {
                                            var commitDate = data.commit.author.date;
                                            var commit = {
                                                newDateCommit: moment(commitDate).format('DD/MM/YYYY'),
                                                message: data.commit.message,
                                                commitUrl: data.html_url
                                            }
                                            if(dateDebut <= commitDate && dateFin >= commitDate ){
                                                person.commitAll.push(commit);
                                                console.log(commit);
                                            } else if(dateDebut <= commitDate && dateFin == ""){
                                                person.commitAll.push(commit)
                                            }
                                        })
                                    })
                                this.commitList.push(person);
                                this.repositoryList = false;
                                this.repositoryUserSelected = true;
                            }
                        })
                    })
            // })
        },
    }

});

