function b64DecodeUnicode(str) {
    return decodeURIComponent(Array.prototype.map.call(atob(str), function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    }).join(''))
}

var app = new Vue({

    el: '#app',

    data: {
        selectedUser: '',
        selectedProject: '',
        projects: ["github-ynov-vue", "gta-ynov-vue"],
        userList: [
            "Killy85",
            "Nair0fl",
            "raphaelCharre",
            "mathiasLoiret",
            "thomaspich",
            "TeofiloJ",
            "Grigusky",
            "Dakistos",
            "mael61",
            "KevinPautonnier",
            "BenoitCochet",
            "sfongue",
            "ClementCaillaud",
            "gfourny",
            "Mokui",
            "LordInateur",
            "AntoineGOSSET",
            "etienneYnov",
            "Coblestone",
            "AlexDesvallees",
            "rudy8530",
            "benjaminbra",
            "mael61",
            "alixnzt",
            "mcourant",
            "msaintmartin",
            "maximerolland"
        ],
        commitList: [],
        startDate: '',
        endDate: '',
        repoList: [],
    },


    methods: {

        //function to call commits
        getCommit: function (repo) {
            var dateDebut = this.startDate;
            var dateFin = this.endDate;
            var person = {
                login: repo.owner.login,
                url: repo.html_url,
                readme: "https://github.com/" + repo.full_name + "/blob/master/README.md",
                commitAll: []
            };

            //call commits
            axios({method: 'GET', url: "https://api.github.com/repos/" + repo.full_name + "/commits"})
                .then(response => {
                    response.data.forEach(data => {
                        //commits
                        var commitDate = data.commit.author.date;
                        var commit = {
                            newDateCommit: moment(commitDate).format('DD/MM/YYYY'),
                            message: data.commit.message,
                            commitUrl: data.html_url,
                        };
                        if (dateDebut <= commitDate && dateFin >= commitDate) {
                            person.commitAll.push(commit);
                        } else if (dateDebut <= commitDate && dateFin == "") {
                            person.commitAll.push(commit)
                        }
                    })
                })
            this.commitList.push(person);
        },

        //function called to display users and their commits
        getAllUser: function () {
            var selectedUser = this.selectedUser;
            var selectedProjet = this.selectedProject;
            this.commitList = [];

            axios.defaults.headers.common['Authorization'] = "Basic bWFlbDYxOmE3dzFzNWU5YzM=";
            axios({method: "GET", "url": "https://api.github.com/search/repositories?q=" + selectedProjet})
                .then((result) => {
                    //user info
                    this.repoList = result.data.items
                    this.repoList.forEach(repo => {
                        if (selectedUser == "Tous") {
                            this.getCommit(repo);
                        } else if (repo.owner.login == selectedUser) {
                            this.getCommit(repo);
                        }
                    })
                })
        },
    }

});

