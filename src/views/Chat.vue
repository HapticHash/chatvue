<template>
    <div class="main">
        <div class="inside">
            <div class="container chat">
                <h2 class="text-center">Simple Real-Time Chat WebApp</h2>
                <h5 class="text-white text-center">Powered by Vue.js &amp; Firebase</h5>
                <div class="card">
                    <div class="card-body">
                        <p class="text-secondary nomessages" v-if="messages.length == 0">[Messages are loading. Please wait...]</p>
                        <div class="messages" v-chat-scroll="{always: false, smooth: true}">
                            <div v-for="message in messages" :key="message.id" class="messageGroup">
                                <span class="text-white badge badge-new">{{ message.name }} </span>  
                                <span> {{ message.message}} </span>
                                <span class="text-secondary time font-italic"> {{ message.timestamp }} </span> 
                            </div>
                        </div>
                    </div>
                    <div class="card-action">
                        <CreateMessage :name="name"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import CreateMessage from '@/components/CreateMessage';
import fb from '@/firebase/init';
import moment from 'moment';
export default {
    name: 'Chat',
    props: ['name'],
    components: {
        CreateMessage
    },
    data() {
        return {
            messages: []
        }
    },
    created() {
        let ref = fb.collection('messages').orderBy('timestamp');
        ref.onSnapshot(snapshot => {
            snapshot.docChanges().forEach(change => {
                if (change.type = 'added') {
                    let doc = change.doc;
                    this.messages.push({
                        id: doc.id,
                        name: doc.data().name,
                        message: doc.data().message,
                        timestamp: moment(doc.data().timestamp).format('LLL')
                    });
                }
            });
        });
    }
}
</script>


<style>
*{
    font-family: 'Lato', sans-serif;
}
.card{
    width: 60%;
    margin: 0 auto;
}

.chat h2{
    font-family: 'Montserrat', sans-serif;
    font-size: 2.6em;
    font-weight: bold;
    margin-top: 5vh;
    margin-bottom: 0px;
}
.chat h5{
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
    margin-top: 1vh;
    margin-bottom: 40px;
}
.chat span{
    font-size: 1.2em;
    text-align: left;
}
.chat .time{
    display: block;
    font-size: 0.7em !important;
}
.badge-new{
    background-color: #00b7ef;
    margin-right: 5px;
}
.messages{
    max-height: 310px;
    text-align: left;
    overflow: auto;
}
.messageGroup{
     margin: 0.5em auto;
}
</style>