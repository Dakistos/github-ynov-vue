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
        selectedUser:'',
        selectedProject:'',
        projects:[
            {
                name:"github-ynov-vue"
            }
        ],
        userList:[],
        commitList:[],
        repositoryList: true,
        repositoryUserSelected: false,
        startDate: '',
        endDate: ''

        // urlList: [],
        // repoList: [],
    },

    filter: {
        moment: function (date) {
            return moment(date).format('MMMM Do YYYY, h:mm:ss a');
        }
    },

    mounted () {
        this.commitList = [];
        this.userList = [];
        axios.defaults.headers.common['Authorization'] = "Basic bWFlbDYxOmE3dzFzNWU5YzM=";
        axios({method: "GET", "url" : "https://api.github.com/search/repositories?q=github-ynov-vue" })
            .then((result) => {
                    this.userList = result.data.items
                })
    },
    methods:{
        getRepo() {
            this.commitList = []

            if(this.selectedUser == "Tous"){
                this.repositoryList = true;
                this.repositoryUserSelected = false;


            } else{
                    this.getUserInfo();
                    console.log(this.commitList);
                }
            },

            getUserInfo: function () {
                this.repositoryList = false;
                this.repositoryUserSelected = true;

                axios({method: "GET", "url" : this.selectedUser.url + "/commits" })
                    .then((result) => {
                        result.data.forEach((res) => {
                            var dateCommit = new Date(res.commit.author.date);
                            var dateDebut = new Date(this.startDate);
                            var dateFin = new Date(this.endDate);
                            // dateDebut.toLocaleDateString('fr-fr');
                            // dateFin.toLocaleDateString('fr-fr');
                            // dateCommit.toLocaleDateString('fr-fr');

                            // noinspection JSAnnotator
                            if(dateCommit.getTime() >= dateDebut.getTime() && dateCommit.getTime() <= dateFin.getTime()){
                                this.commitList.push(res)
                                console.log(res.commit.author.date + "///" + this.startDate)
                            }else if(dateCommit.getTime() >= dateDebut.getTime() && dateFin.getTime() == ""){
                                this.commitList.push(res)
                                console.log(res.commit.author.date + "///" + this.startDate)
                            } else if(dateDebut.getTime() == "" && dateFin.getTime() == ""){
                                this.commitList.push(res)
                                console.log(res.commit.author.date + "///" + this.startDate)
                            }
                        })
                    })
                }
            }
});

