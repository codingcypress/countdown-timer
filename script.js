const minutesInput = document.getElementById("minutes");
        const secondsInput = document.getElementById("seconds");
        const timerDisplay = document.getElementById("timer-display");
        const startButton = document.getElementById("start");
        const pauseButton = document.getElementById("pause");
        const resetButton = document.getElementById("reset");

        let totalSeconds = 0;
        let intervalId = null;
        let isPaused = false;

        function formatTime(seconds) {
            const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
            const secs = (seconds % 60).toString().padStart(2, '0');
            return `${mins}:${secs}`;
        }

        function startTimer() {
            if (isPaused) {
                // Resume the timer if paused
                isPaused = false;
                pauseButton.textContent = "Pause";
                countdown();
                intervalId = setInterval(countdown, 1000);
            } else {
                // Initialize a new timer
                const minutes = parseInt(minutesInput.value) || 0;
                const seconds = parseInt(secondsInput.value) || 0;

                if (minutes < 0 || seconds < 0 || (minutes === 0 && seconds === 0)) {
                    alert("Please enter a valid time.");
                    return;
                }

                totalSeconds = minutes * 60 + seconds;
                timerDisplay.textContent = formatTime(totalSeconds);
                clearInterval(intervalId);
                intervalId = setInterval(countdown, 1000);
            }
        }

        function countdown() {
            if (totalSeconds > 0) {
                totalSeconds--;
                timerDisplay.textContent = formatTime(totalSeconds);
            } else {
                clearInterval(intervalId);
                alert("Time's up!");
            }
        }

        function pauseTimer() {
            if (isPaused) {
                // Resume the timer
                isPaused = false;
                pauseButton.textContent = "Pause";
                intervalId = setInterval(countdown, 1000);
            } else {
                // Pause the timer
                isPaused = true;
                pauseButton.textContent = "Play";
                clearInterval(intervalId);
            }
        }

        function resetTimer() {
            clearInterval(intervalId);
            totalSeconds = 0;
            timerDisplay.textContent = "00:00";
            minutesInput.value = "";
            secondsInput.value = "";
            isPaused = false;
            pauseButton.textContent = "Pause";
        }

        startButton.addEventListener("click", startTimer);
        pauseButton.addEventListener("click", pauseTimer);
        resetButton.addEventListener("click", resetTimer);