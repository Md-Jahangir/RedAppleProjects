<template>
    <div class="logo">
        <img src="./assets/images/logo.png" alt="LTTS">
    </div>
    <div v-if="room">
        <div class="custom-toast" v-if="indicatorMessage">
            <span>{{ indicatorMessage }}</span>
        </div>
        <div class="timer-toast" v-if="isGameStarted">
            <span>Time left: {{ timeLeft }}</span>
        </div>
        <button id="showChat" v-if="!showChat" @click.prevent="toggleChat(true)">SHOW CHAT</button>
        <div class="chat-box" v-if="showChat">
            <div class="chat-header">
                <h3>Chat</h3>
                <span id="hideChat" @click.prevent="toggleChat(false)">X</span>
            </div>
            <div class="chat-body">
                <ul>
                    <li v-for="(x, i) in gameState.messages" :key="i" :class="{'my-msg': room.sessionId === x.playerId}">
                        [{{ getPlayer(x.playerId)?.name }}] {{ x.message }}
                    </li>
                </ul>
            </div>
            <div class="chat-form">
                <form @submit.prevent="sendMessage">
                    <input type="text" placeholder="Enter your message" name="" v-model="message" required>
                    <input type="submit" value="SEND" name="">
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import configureGame from '@/phaser';

export default {
    name: 'App',
    data: () => ({
        showChat: false,
        message: '',
    }),
    computed: {
        room() {
            return this.$store.getters['room/getRoom'];
        },
        gameState() {
            return this.$store.getters['room/getGameState'];
        },
        isGameStarted() {
            return this.gameState.status !== 'Waiting';
        },
        indicatorMessage() {
            return this.$store.getters['room/indicatorMessage'];
        },
        timeLeft() {
            const seconds = this.gameState.clock;
            if (seconds > 0) {
                let minutes = Math.floor(seconds / 60);
                let partInSeconds = seconds % 60;
                partInSeconds = partInSeconds.toString().padStart(2, '0');
                return `${minutes}:${partInSeconds}`;
            } else {
                return '00:00';
            }
        },
    },
    methods: {
        getPlayer(id) {
            return this.gameState.players.find(player => player.id === id);
        },
        toggleChat(value) {
            this.showChat = value;
        },
        async sendMessage() {
            try {
                await this.room.send('chatMessage', this.message);
                this.message = '';
            } catch (err) {
                console.log('JOIN ERROR', err);
            }
        },
    },
    async mounted() {
        configureGame();
        this.$store.dispatch('room/connectClient');
    }
};
</script>

<style scoped lang="css">
#showChat {
    position: absolute;
    display: block;
    left: 20px;
    bottom: 20px;
    max-width: 400px;
    font-family: Arial;
    background: #000000c4;
    padding: 15px 20px;
    color: #fff;
    border-radius: 5px;
    border: 0;
    font-weight: bold;
    cursor: pointer;
    letter-spacing: 1px;
    transition: all 0.5s;
}

#showChat:hover {
    background: #01b11fc4;
}

.chat-box {
    display: block;
    position: absolute;
    left: 20px;
    bottom: 20px;
    max-width: 400px;
    font-family: Arial;
}

.chat-header h3 {
    display: inline-block;
    margin-bottom: 0;
    background: #00000085;
    padding: 10px 20px;
    color: #fff;
}

.chat-header #hideChat {
    position: absolute;
    right: 0;
    top: 20px;
    cursor: pointer;
    color: #fff;
    background: black;
    width: 35px;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    transition: all 0.5s;
}

.chat-header #hideChat:hover {
    background: red;
}

.chat-body {
    background: #00000085;
    padding: 10px 20px;
}

.chat-body ul {
    list-style: none;
    padding-left: 0;
}

.chat-body ul li {
    font-size: 14px;
    margin-bottom: 10px;
    color: #ffe634;
}

.chat-body ul li.my-msg {
    color: #00ff7e;
}

.chat-form {
    background: #00000085;
    padding: 10px 20px;
}

.chat-form form {
    display: flex;
    justify-content: space-between;
    gap: 10px;
}

.chat-form input[type='text'] {
    width: 100%;
    padding: 10px 20px;
    border-radius: 0;
    border: 0;
    font-size: 14px;
    background: rgba(255, 255, 255, 0.7);
}

.chat-form input[type='submit'] {
    border-radius: 0;
    border: 0;
    padding: 10px 20px;
    cursor: pointer;
    background: #0000008f;
    color: #fff;
    border: 1px solid white;
}
</style>
