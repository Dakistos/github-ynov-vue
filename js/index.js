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
        selectUser() {
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

                // axios.defaults.headers.common['Authorization'] = "Basic bWFlbDYxOmE3dzFzNWU5YzM=";
                axios({method: "GET", "url" : this.selectedUser.url + "/commits" })
                    .then((result) => {
                        result.data.forEach((res) => {
                            this.commitList.push(res)
                        })
                    })
            }
        }
});

