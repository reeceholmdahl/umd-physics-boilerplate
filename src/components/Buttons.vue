<template>
    <div id="buttons">
        <button :class="[running ? 'running' : '', 'run']" @click="runCode">Run Code</button>
        <button :class="[cleared ? 'cleared' : '', 'clear']" @click="clearCode">Clear Code</button>
    </div>
</template>

<script>
export default {
    name: 'Buttons',
    data() {
        return {
            running: false,
            cleared: false,
            runCodeBtnTimer: null,
            clearCodeBtnTimer: null
        };
    },
    methods: {
        runCode() {
            if (!this.running) {
                this.$emit('reset');
                this.$emit('runCode');
                clearTimeout(this.runCodeBtnTimer);
                this.running = true;
                this.runCodeBtnTimer = setTimeout(() => { this.running = false; }, 3600);
            }
        },

        clearCode() {
            this.$emit('reset');
            this.$emit('clearCode');
            clearTimeout(this.clearCodeBtnTimer);
            this.cleared = true;
            clearTimeout(this.runCodeBtnTimer);
            this.running = false;
            this.clearCodeBtnTimer = setTimeout(() => { this.cleared = false; }, 900);
        }
    },
    emits: [
        'runCode',
        'clearCode',
        'reset'
    ]
}
</script>

<style scoped>
#buttons {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
    width: calc(50vw + 18px);
    height: 40px;
    padding: 0;
    margin: 0;
    margin-top: 2px;
    margin-bottom: 2px;
}

button {
    outline: unset;
    border: 4px solid #1d1d1d;
    padding: 1.5px;
    margin: 0;
    height: 40px;
    width: 100px;
    transition: background-color 0.2s linear, border 0.1s linear;
}

/* button:active {
    border-color: #222222;
    border-width: 6px;
} */

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