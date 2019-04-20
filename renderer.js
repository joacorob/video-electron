// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const pkg = require(__dirname + '/package.json')
const EventEmitter = require('events');
const fs = require('fs');
const https = require('http');
const path = require('path');

class MyEmitter extends EventEmitter {}
const emitter = new MyEmitter();

const Persist = require('electron-store');
const persist = new Persist();




/* * *
  BODY DROP INIT
* * */

document.ondragover = document.ondrop = (ev) => {
  ev.preventDefault();
}
document.body.ondrop = (ev) => {
  ev.preventDefault()
  const file = ev.dataTransfer.files[0].path;
  emitter.emit('document-drop', {file})
}

emitter.on('background-color', (data) => {
  $("body").css({background: data.color})
});

emitter.on('foreground-color', (data) => {
  $("body").css({color: data.color})
});



/* * *
  VUE COMPONENT EXAMPLE
* * */

const store = new Vuex.Store({

  state: {
    count: 1,

    selectedMessageId: 2,
    messages: [
       { id: 1, subject:'Renew Domain', text: '...', inbox: true },
       { id: 2, subject:'New Server Activated', text: '...', inbox: true },
       { id: 3, subject:'Product Generation Complete', text: '...', inbox: false },
       { id: 4, subject:'New Company Deployment', text: '...', inbox: false },
     ]

  },

  getters: {

     selectedMessageId: state => {
       return state.selectedMessageId;
     },

     inboxMessages: state => {
       return state.messages.filter(message => message.inbox)
     },

     inboxMessagesCount: (state, getters) => {
       return getters.inboxMessages.length
     },

     getMessageById: (state, getters) => (id) => {
       return state.messages.find(message => message.id === id)
     }

   },

  mutations: {
    selectMessage (state, id) {
      state.selectedMessageId = id;
    },
    increment (state) {
      state.count++
    }
  },

  actions: {
    incrementAsync ({ commit }) {
      setInterval(() => {
        commit('increment')
      }, 1000)
    }
  }

})

const Counter = {
  template: `<div>{{ count }}</div>`,
  computed: {
    count () {
      return this.$store.state.count
    }
  }
}

const app = new Vue({
  el: '#app',

  store,

  components: { Counter },

  template: `
    <div class="app border border-success p-3 m-3">
      Vuex Counter: <counter></counter>
    </div>
  `

})
/*
const appInboxMenu = new Vue({
  el: '#app-inbox-menu',

  store,

  components: { Counter },

  computed: {

     inboxMessage () {
      return this.$store.getters.getTodoById(this.$store.message);
    },
     inboxMessages () {
      return this.$store.getters.inboxMessages
    },
    inboxMessagesCount () {
      return this.$store.getters.inboxMessagesCount
    }
  },

  template: `
  <div>

    <h5><i class="fa fa-inbox fa-1x text-secondary"></i> Inbox <span class="badge badge-danger">{{inboxMessagesCount}}</span></h5>

     <div class="m-3">
       <i class="fa fa-inbox text-secondary"></i> Support Questions <span class="badge badge-secondary">9</span>
     </div>

     <div class="m-3">
       <i class="fa fa-inbox text-secondary"></i> Accounts Receivable <span class="badge badge-secondary">9</span>
     </div>

   </div>
  `

})
*/
const appInbox = new Vue({
  el: '#app-inbox',

  store,

  components: { Counter },

  methods: {
    selectMessage (id) {
      this.$store.commit('selectMessage', id)

    },
    isActive (message) {
      return (message.id === this.$store.getters.selectedMessageId);
    },
  },

  computed: {

    inboxMessage () {
      return this.$store.getters.getTodoById(this.$store.message);
    },
     inboxMessages () {
      return this.$store.getters.inboxMessages
    },
    inboxMessagesCount () {
      return this.$store.getters.inboxMessagesCount
    }
  },

  template: `
    <ul class="list-group mb-3">
      <li v-for="message in inboxMessages" v-bind:class="{ 'list-group-item': true, 'active': isActive(message) } ">
        <span v-on:click="selectMessage(message.id)" >{{ message.subject }}</span>
      </li>
    </ul>
  `

})

store.dispatch({
  type: 'incrementAsync',
  amount: 10
})

//var appTitle = new Vue({
  //el: '#app-title',
  //data: pkg
//});




/* * *
  JQUERY EXAMPLE
* * */

$(function(){
  $('title').text('SmartHockey Editor');
});




/* * *
  INTERNAL API EXAMPLE
* * */

emitter.on('document-drop', (data) => {
  //alert('Dropped ' + data.file);
});


/* * *
  VUE CATEGORIES
* * */

// Define a new component called button-counter
Vue.component('categories', {
  data: function () {
    return {
      count: 0,
      data: JSON.parse('{"editions":[{"name":"CortoOf","edits":[{"start_time":"00:00:02","stop_time":"00:00:02"}]},{"name":"Cortodef","edits":[{"start_time":"00:00:08","stop_time":"00:00:10"}]}]}')
    }
  },
  template: '<button class="btn btn-info" v-on:click="count++">You clicked me {{ count }} times.</button>'
})

//new Vue({ el: '#components-demo' })

var app_vue = new Vue({
  el: '#panel',
  data: {
    message: 'Hello Vue!',
    input: '',
    data: [],
    current_category: '',
    current_edition: '',
    categories: JSON.parse('{"1":{"id":1,"name":"Salida","post_time":12,"previous_time":2,"hot_key":"a","type":"defense","color":null,"created_at":null,"updated_at":null},"2":{"id":2,"name":"Bloqueo","post_time":10,"previous_time":1,"hot_key":"d","type":"attack","color":null,"created_at":null,"updated_at":null},"3":{"id":3,"name":"Corto Of","post_time":10,"previous_time":3,"hot_key":"w","type":"attack","color":null,"created_at":null,"updated_at":null},"4":{"id":4,"name":"Corto Def","post_time":10,"previous_time":3,"hot_key":"x","type":"defense","color":null,"created_at":null,"updated_at":null},"5":{"id":5,"name":"Transicion Ataque","post_time":6,"previous_time":2,"hot_key":null,"type":"middle","color":null,"created_at":null,"updated_at":null},"6":{"id":6,"name":"Recuperaciones","post_time":4,"previous_time":4,"hot_key":null,"type":"middle","color":null,"created_at":null,"updated_at":null},"7":{"id":7,"name":"Gol a Favor","post_time":2,"previous_time":12,"hot_key":"k","type":"attack","color":null,"created_at":null,"updated_at":null},"8":{"id":8,"name":"Gol en Contra","post_time":2,"previous_time":12,"hot_key":"j","type":"defense","color":null,"created_at":null,"updated_at":null},"9":{"id":9,"name":"Largo a Favor","post_time":1,"previous_time":6,"hot_key":null,"type":"attack","color":null,"created_at":null,"updated_at":null},"10":{"id":10,"name":"Largo en Contra","post_time":1,"previous_time":6,"hot_key":null,"type":"defense","color":null,"created_at":null,"updated_at":null},"11":{"id":11,"name":"Ingreso al area a favor","post_time":2,"previous_time":7,"hot_key":null,"type":"attack","color":null,"created_at":null,"updated_at":null},"12":{"id":12,"name":"Ingreso al area en contra","post_time":2,"previous_time":7,"hot_key":null,"type":"defense","color":null,"created_at":null,"updated_at":null}}')
  },
  mounted:function(){
    this.getDataPersisted() //method1 will execute at pageload
  },
  created: function () {
    window.addEventListener('keyup', this.moveEdits)
  },
  methods: {
    collapse_id(thread_ref, is_href) {
      if (is_href) { return '#collapse_' + thread_ref }
      return 'collapse_' + thread_ref
    },
    edit_id(thread_ref) {
      return 'edit-' + thread_ref
    },
    viewEdit(edit, category_id){
      console.log(edit, category_id)
      var actives = document.getElementsByClassName('list-group-item active');
      for (var i = actives.length - 1; i >= 0; i--) {
        actives[i].className = "list-group-item";
      }
      this.findNext(category_id, edit.id);
      var currentEdit = document.querySelector('#edit-'+edit.id);
      currentEdit.className += " active";
      var startTimeArray = edit.start_time.split(":");
      var stopTimeArray = edit.stop_time.split(":");
      var startTimeInSec = parseInt(startTimeArray[2]) + parseInt(startTimeArray[1]) * 60 + parseInt(startTimeArray[0]) * 3600
      var stopTimeInSec = parseInt(stopTimeArray[2]) + parseInt(stopTimeArray[1]) * 60 + parseInt(stopTimeArray[0]) * 3600
      var video = document.querySelector('#videoContainer');
      var stopTime = document.querySelector('#stopTime');
      stopTime.value = stopTimeInSec
      video.currentTime = startTimeInSec
      video.play();
    },
    viewEdits(edits){
      for (var i = 0; i < edits.length; i++) {
        this.viewEdit(edits[i], edits.id)
      }
    },
    parseData(input){
      this.data = JSON.parse(input)
      this.input = ''
      persist.set('data', JSON.parse(input));
    },
    getDataPersisted(){
      this.data = persist.get('data')
      console.log(this.data, this.categories)
    },
    findNext(category_id, edition_id){
      this.current_category = this.data.editions.find(item => item.id === category_id); //array con categorias seleccionada
      this.current_edition = this.current_category.edits.findIndex(item => item.id === edition_id); //busco index
    },
    moveEdits(event){
      if (event.which == 39) {
        this.viewEdit(this.current_category.edits[(this.current_edition + 1) % this.current_category.edits.length], this.current_category.id)
      }else if (event.which == 37){
        this.viewEdit(this.current_category.edits[(this.current_edition - 1) % this.current_category.edits.length], this.current_category.id)
      }
    },
    saveEdit(category_id){
      var video = document.querySelector('#videoContainer');
      var current_time = parseInt(video.currentTime);
      var previous_time = parseInt(video.currentTime) - parseInt(this.categories[category_id].previous_time);
      if (previous_time < 0) {
        previous_time = 0;
      }
      var post_time = parseInt(video.currentTime) + parseInt(this.categories[category_id].post_time);
      category_array = this.data.editions.find(item => item.id === category_id); //array con categorias seleccionada
      current_edition = {id: category_array.edits.length, start_time: this.timeToFormattedTime(previous_time*1000), stop_time: this.timeToFormattedTime(post_time*1000)}
      category_array.edits.push(current_edition);
      category_array.total_editions++
      console.log(category_array)//
    },
    timeToFormattedTime(ms){
      var date = new Date(ms);
      var time = [];

      if (date.getUTCHours() < 10) {
        time.push('0'+date.getUTCHours());
      }else{
        time.push(date.getUTCHours());
      }
      if (date.getUTCMinutes() < 10) {
        time.push('0'+date.getUTCMinutes());
      }else{
        time.push(date.getUTCMinutes());
      }
      if (date.getUTCSeconds() < 10) {
        time.push('0'+date.getUTCSeconds());
      }else{
        time.push(date.getUTCSeconds());
      }

      return time.join(':');
    },
    deleteEdit(category_id, edit_id){
      category_array = this.data.editions.find(item => item.id === category_id); //array con categorias seleccionada
      current_edition = category_array.edits.findIndex(item => item.id === edit_id); //busco index
      //remove this
      category_array.edits.splice(current_edition, 1);
      category_array.total_editions--
    }
  }
})


/* * *
  INTERNAL API EXAMPLE
* * */
$(function(){
  $( "#emitter-example-form" ).submit(function( event ) {
    const eventName = $( "#event-name-select" ).val();
    const color = $( "#example-color-input" ).val();
    console.log((eventName, {color}))
    emitter.emit(eventName, {color})
    event.preventDefault();
  });

});
