<template>
    <div class="container" style="height: 8vw;">
        <form @submit.prevent="createMessage">
            <div class="form-group">
                <span class="input input--hoshi">
                    <input class="input__field input__field--hoshi" type="text" id="input-4" name="message" v-model="newMessage"/>
                    <label class="input__label input__label--hoshi input__label--hoshi-color-1" for="input-4">
                        <span class="input__label-content input__label-content--hoshi">Enter a message</span>
                    </label>
                    <p class="text-danger" v-if="errorText">{{ errorText }}</p>                    
                </span>
                <button class="btnSub" type="submit" name="action" >Send <font-awesome-icon icon="paper-plane" class="fa"/>  </button>
            </div>
        </form>
    </div>
</template>

<script>
import fb from '@/firebase/init';
export default {
    name: 'CreateMessage',
    props: ['name'],
    data() {
        return {
            newMessage: null,
            errorText: null
        }
    },
    methods: {
        createMessage () {
            if (this.newMessage) {
                fb.collection('messages').add({
                    message: this.newMessage,
                    name: this.name,
                    timestamp: Date.now()
                }).catch(err => {
                    console.log(err);
                });
                this.newMessage = null;
                this.errorText = null;
            } else {
                this.errorText = "A message must be entered first!";
            }
        }
    }    
}
</script>

<style>
.btnSub{
    width: 20%;
    height: calc(100% - 1em);
    font-weight: 600;
    padding: 2vh 1vw; 
    text-transform: uppercase;
    color: white;
    border-radius: 5px;
    background-color: #00b7ef;
    box-shadow: 0 20px 30px -6px rgba(30, 161, 255, 0.5);
    outline: none;
    border: none;
    cursor: pointer;
    transition: all .2s ease-in-out;
    margin: 2vw auto;
}
.btnSub:hover{
    transform: translatey(3px);
    box-shadow: none;
}
.chat span {
    font-size: 1.1em !important;
}
.fa{
    margin-left: 0.5vw;
}
</style>
