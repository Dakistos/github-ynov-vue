
var app = new Vue({

    el: '#app',

    data: {
        selectedUser:'',
        selectedProject:'',
        projets:[
            {
                name:"github-ynov-vue"
            }
        ],
        userList:[],
        commitList:[],
        repositoryList: true,
        repositoryUserSelected: false,
    },

    mounted () {

        fetch("https://api.github.com/search/repositories?q=github-ynov-vue",{
            headers: {
                "Authorization": "Basic bWFlbDYxOmE3dzFzNWU5YzM="
            },
            method: "GET"
        })
            .then(response =>response.json())
            .then((data) => {
                this.userList = data.items

            })
    },
    methods:{
        selectUser() {
            this.commitList = []
            this.repositoryList = false;
            this.repositoryUserSelected = true;

            fetch(this.selectedUser.url + "/commits", {
                headers: {
                    "Authorization": "Basic bWFlbDYxOmE3dzFzNWU5YzM="
                },
                method: "GET"
            })
                .then(response => response.json())

                .then((data) => {

                    data.forEach((res) => {
                        this.commitList.push(res)
                    })
                })
        }

    }



});

