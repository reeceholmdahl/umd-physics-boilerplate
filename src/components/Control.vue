<template>
    <div id="buttons">
        <div id="runAndTime">
            <button :class="[running ? 'running' : '', 'run']" @click="runCode" v-text="runBtnMsg"></button>
            <input type="input" v-model.number="m_runTime" @input="updateRunTime">
        </div>
        <button :class="[cleared ? 'cleared' : '', 'clear']" @click="clearCode">Clear Code</button>
    </div>
</template>

<script>
export default {
    name: 'Control',
    data() {
        return {
            running: false,
            cleared: false,
            runCodeBtnTimer: null,
            clearCodeBtnTimer: null,
            m_runTime: 0,
            runBtnMsg: 'Run Code'
        };
    },
    props: [
        'runTime',
    ],
    emits: [
        'runCode',
        'clearCode',
        'reset',
        'focus',
        'update:runTime'
    ],
    watch: {
        'runTime': function(newRunTime) {
            this.m_runTime = newRunTime;
        }
    },
    methods: {
        runCode() {
            if (!this.running) {
                this.$emit('reset');
                this.$emit('runCode');
                this.$emit('focus');
                clearTimeout(this.runCodeBtnTimer);
                this.running = true;
                this.runBtnMsg = 'Running';
                this.runCodeBtnTimer = setTimeout(() => {
                    this.running = false;
                    this.runBtnMsg = 'Run Code';
                }, this.runTime * 1000 + 100);
            }
        },

        clearCode() {
            this.$emit('reset');
            this.$emit('clearCode');
            this.$emit('focus');
            clearTimeout(this.clearCodeBtnTimer);
            this.cleared = true;
            clearTimeout(this.runCodeBtnTimer);
            this.running = false;
            this.clearCodeBtnTimer = setTimeout(() => { this.cleared = false; }, 900);
        },

        updateRunTime() {
            this.$emit('update:runTime', this.m_runTime);
        }
    }
}
</script>

<style scoped>
#buttons {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: calc(50vw + 18px);
    height: 40px;
    padding: 0;
    margin: 0;
    margin-top: 2px;
    margin-bottom: 2px;
}

button, input {
    font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
    font-size: 13px;
    line-height: 1.5;
    outline: unset;
    border: 4px solid #1d1d1d;
    padding: 1.5px;
    margin: 0;
    height: 40px;
    width: 100px;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    transition: background-color 0.2s linear, border 0.1s linear;
}

input {
    margin-left: 10px;
    background-color: #ddd; /* different color than this */
    padding-left: 10px;
    padding-right: 5px;
}

.run {
    /* background-color: #70FA46; old color */
    background-color: yellowgreen;
}

@keyframes running_flashing {
    0% { background-color: yellowgreen; }
    16% { background-color: #698C22; }
    33% { background-color: yellowgreen; }
    50% { background-color: #698C22; }
    67% { background-color: yellowgreen; }
    83% { background-color: #698C22; }
    100% { background-color: yellowgreen; }
}

@keyframes border_shrink {
    from { border-width: 7px; }
    to { border-width: 4px; }
}

.running {
    border-color: #222222;
    animation: running_flashing 3.5s linear 0s 1, border_shrink 0.33s ease-in-out 0s 1;
}

.run:hover {
    background-color: #85B32B;
}

.clear {
    /* background-color: #E3346F; old color */
    background-color: deeppink;
}

@keyframes cleared_flash {
    0% { background-color: deeppink; }
    50% { background-color: #BF0F6D; }
    90% { background-color: #BF0F6D; }
    100% { background-color: deeppink; }
}

.cleared {
    border-color: #222222;
    animation: cleared_flash 0.8s linear 0s 1, border_shrink 0.33s ease-in-out 0s 1;
}

.clear:hover {
    background-color: #E61283;
}
</style>