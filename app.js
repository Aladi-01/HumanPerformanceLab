// ==========================================
// HUMAN PERFORMANCE LAB
// MAIN APPLICATION LOGIC
// ==========================================


// ---------- WEEKLY STRUCTURE ----------

const weeklyStructure = {

    Monday: {
        category: "Push",
        description: "Upper-body pushing strength and control."
    },

    Tuesday: {
        category: "Pull",
        description: "Back, pulling strength, grip and control."
    },

    Wednesday: {
        category: "Legs + Core",
        description: "Lower-body strength, stability and core control."
    },

    Thursday: {
        category: "Flexibility + Mobility",
        description: "Improve movement quality, mobility and flexibility."
    },

    Friday: {
        category: "Stability",
        description: "Balance, coordination and joint control."
    },

    Saturday: {
        category: "Endurance",
        description: "Build cardiovascular endurance and work capacity."
    },

    Sunday: {
        category: "Recovery",
        description: "Low-intensity movement and recovery."
    }

};


// ---------- DOM ELEMENTS ----------

const dayCards =
    document.querySelectorAll(".day-card");

const todayCategory =
    document.getElementById("todayCategory");

const todayDescription =
    document.getElementById("todayDescription");

const sessionTitle =
    document.getElementById("sessionTitle");

const exerciseList =
    document.getElementById("exerciseList");

const startWorkoutBtn =
    document.getElementById("startWorkoutBtn");

const trainingDays =
    document.getElementById("trainingDays");

const exerciseCount =
    document.getElementById("exerciseCount");

const sessionCount =
    document.getElementById("sessionCount");


// ---------- APP STATE ----------

let currentDay = "Monday";

let currentSession = [];

let completedSessions =
    getStoredSessions();

let activeWorkout = null;

let workoutTimer = null;

let workoutStartTime = null;


// ---------- GET EXERCISES ----------

function getExercisesForCategory(category) {

    if (!window.exerciseDatabase) {

        console.error(
            "Exercise database not found."
        );

        return [];
    }

    return window.exerciseDatabase.filter(
        exercise =>
            exercise.category === category
    );
}


// ---------- RENDER EXERCISES ----------

function renderExercises(category) {

    const exercises =
        getExercisesForCategory(category);


    let html = `

        <div class="exercise-section">

            <div class="section-heading">

                <h3>
                    Available Exercises
                </h3>

                <p>
                    Select exercises to build today's session.
                </p>

            </div>

            <div class="available-exercises">

    `;


    if (exercises.length === 0) {

        html += `

            <div class="empty-state">

                <h3>
                    No exercises found
                </h3>

                <p>
                    There are currently no exercises
                    in the ${category} category.
                </p>

            </div>

        `;

    } else {

        exercises.forEach(exercise => {

            const alreadyAdded =
                currentSession.some(
                    item =>
                        item.id === exercise.id
                );


            html += `

                <div class="exercise-card">

                    <div class="exercise-info">

                        <h3>
                            ${exercise.name}
                        </h3>

                        <p class="exercise-meta">
                            ${exercise.movement}
                        </p>

                        <p>
                            <strong>Muscles:</strong>
                            ${exercise.muscles.join(", ")}
                        </p>

                        <p>
                            <strong>Difficulty:</strong>
                            ${exercise.difficulty}
                        </p>

                        <p>
                            <strong>Equipment:</strong>
                            ${exercise.equipment}
                        </p>

                        <p>
                            <strong>Default:</strong>
                            ${exercise.defaultSets}
                            sets ×
                            ${exercise.defaultReps}
                        </p>

                    </div>

                    <button
                        class="primary-button add-exercise-btn"
                        data-id="${exercise.id}"
                        ${alreadyAdded ? "disabled" : ""}
                    >
                        ${
                            alreadyAdded
                                ? "ADDED ✓"
                                : "ADD"
                        }
                    </button>

                </div>

            `;

        });

    }


    html += `

            </div>

        </div>


        <div class="session-builder">

            <div class="section-heading">

                <h3>
                    Today's Session
                </h3>

                <p>

                    ${
                        currentSession.length === 0

                            ? "No exercises selected yet."

                            : `${currentSession.length}
                               exercise(s) selected.`

                    }

                </p>

            </div>

    `;


    // ---------- EMPTY SESSION ----------

    if (currentSession.length === 0) {

        html += `

            <div class="empty-state">

                <h3>
                    Your workout is empty
                </h3>

                <p>
                    Add exercises above to build your session.
                </p>

            </div>

        `;

    }

    // ---------- SELECTED SESSION ----------

    else {

        html += `

            <div class="selected-exercises">

        `;


        currentSession.forEach(
            (exercise, index) => {

                html += `

                    <div class="selected-exercise">

                        <div>

                            <h3>
                                ${index + 1}.
                                ${exercise.name}
                            </h3>

                            <p>
                                ${exercise.defaultSets}
                                sets ×
                                ${exercise.defaultReps}

                                • Rest:
                                ${exercise.rest}
                            </p>

                        </div>

                        <button
                            class="remove-exercise-btn"
                            data-id="${exercise.id}"
                        >
                            REMOVE
                        </button>

                    </div>

                `;

            }
        );


        html += `

            </div>

            <button
                id="saveSessionBtn"
                class="primary-button save-session-btn"
            >
                SAVE SESSION PLAN
            </button>

        `;

    }


    html += `

        </div>

    `;


    exerciseList.innerHTML = html;


    attachExerciseButtons();

    attachRemoveButtons();

    attachSaveButton();

}


// ---------- ADD EXERCISE ----------

function addExerciseToSession(id) {

    const exercise =
        window.exerciseDatabase.find(
            item =>
                item.id === id
        );


    if (!exercise) {
        return;
    }


    const alreadyExists =
        currentSession.some(
            item =>
                item.id === id
        );


    if (alreadyExists) {
        return;
    }


    currentSession.push(exercise);


    renderExercises(
        weeklyStructure[currentDay].category
    );

}


// ---------- REMOVE EXERCISE ----------

function removeExerciseFromSession(id) {

    currentSession =
        currentSession.filter(
            exercise =>
                exercise.id !== id
        );


    renderExercises(
        weeklyStructure[currentDay].category
    );

}


// ---------- ADD BUTTON EVENTS ----------

function attachExerciseButtons() {

    const buttons =
        document.querySelectorAll(
            ".add-exercise-btn"
        );


    buttons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const id =
                    button.dataset.id;

                addExerciseToSession(id);

            }
        );

    });

}


// ---------- REMOVE BUTTON EVENTS ----------

function attachRemoveButtons() {

    const buttons =
        document.querySelectorAll(
            ".remove-exercise-btn"
        );


    buttons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const id =
                    button.dataset.id;

                removeExerciseFromSession(id);

            }
        );

    });

}


// ---------- SAVE SESSION PLAN ----------

function attachSaveButton() {

    const saveButton =
        document.getElementById(
            "saveSessionBtn"
        );


    if (!saveButton) {
        return;
    }


    saveButton.addEventListener(
        "click",
        saveSessionPlan
    );

}


function saveSessionPlan() {

    if (currentSession.length === 0) {

        alert(
            "Add at least one exercise first."
        );

        return;
    }


    alert(
        `Session plan ready ✓\n\n` +
        `${currentDay} — ` +
        `${weeklyStructure[currentDay].category}\n\n` +
        `${currentSession.length} exercises selected.\n\n` +
        `Press START SESSION to begin.`
    );

}


// ---------- START WORKOUT ----------

startWorkoutBtn.addEventListener(
    "click",
    startWorkout
);


function startWorkout() {

    if (currentSession.length === 0) {

        alert(
            "First add some exercises to your session."
        );

        return;
    }


    if (activeWorkout) {
        return;
    }


    activeWorkout = {

        day: currentDay,

        category:
            weeklyStructure[currentDay].category,

        startTime:
            Date.now(),

        exercises:
            currentSession.map(
                exercise => ({

                    ...exercise,

                    completedSets: 0

                })
            )

    };


    workoutStartTime =
        activeWorkout.startTime;


    startWorkoutTimer();

    renderActiveWorkout();

}


// ---------- WORKOUT TIMER ----------

function startWorkoutTimer() {

    stopWorkoutTimer();


    workoutTimer =
        setInterval(
            updateWorkoutTimer,
            1000
        );


    updateWorkoutTimer();

}


function stopWorkoutTimer() {

    if (workoutTimer) {

        clearInterval(
            workoutTimer
        );

        workoutTimer = null;

    }

}


function updateWorkoutTimer() {

    if (!workoutStartTime) {
        return;
    }


    const elapsed =
        Date.now() -
        workoutStartTime;


    const totalSeconds =
        Math.floor(
            elapsed / 1000
        );


    const hours =
        Math.floor(
            totalSeconds / 3600
        );


    const minutes =
        Math.floor(
            (totalSeconds % 3600) / 60
        );


    const seconds =
        totalSeconds % 60;


    const timer =
        document.getElementById(
            "workoutTimer"
        );


    if (!timer) {
        return;
    }


    timer.textContent =

        `${String(hours).padStart(2, "0")}:` +

        `${String(minutes).padStart(2, "0")}:` +

        `${String(seconds).padStart(2, "0")}`;

}


// ---------- RENDER ACTIVE WORKOUT ----------

function renderActiveWorkout() {

    if (!activeWorkout) {
        return;
    }


    sessionTitle.textContent =
        `${activeWorkout.day} — ACTIVE WORKOUT`;


    let html = `

        <div class="active-workout">

            <div class="workout-timer-card">

                <span>
                    SESSION TIME
                </span>

                <strong id="workoutTimer">
                    00:00:00
                </strong>

                <small>
                    Active workout duration
                </small>

            </div>


            <div class="workout-status">

                <h3>
                    🔴 Workout in progress
                </h3>

                <p>
                    ${activeWorkout.category}
                </p>

            </div>

    `;


    activeWorkout.exercises.forEach(
        (exercise, exerciseIndex) => {

            const totalSets =
                Number(
                    exercise.defaultSets
                ) || 1;


            html += `

                <div class="active-exercise">

                    <h2>
                        ${exerciseIndex + 1}.
                        ${exercise.name}
                    </h2>

                    <p>
                        ${exercise.defaultReps}
                        • Rest:
                        ${exercise.rest}
                    </p>

                    <div class="set-list">

            `;


            for (
                let set = 1;
                set <= totalSets;
                set++
            ) {

                const completed =
                    set <=
                    exercise.completedSets;


                html += `

                    <button
                        class="set-button ${
                            completed
                                ? "set-completed"
                                : ""
                        }"

                        data-exercise="${exerciseIndex}"

                        data-set="${set}"

                        ${
                            completed
                                ? "disabled"
                                : ""
                        }
                    >

                        ${
                            completed
                                ? `✓ SET ${set}`
                                : `SET ${set} — COMPLETE`
                        }

                    </button>

                `;

            }


            html += `

                    </div>

                </div>

            `;

        }
    );


    html += `

            <button
                id="finishWorkoutBtn"
                class="primary-button"
            >
                FINISH WORKOUT
            </button>

        </div>

    `;


    exerciseList.innerHTML = html;


    startWorkoutBtn.textContent =
        "WORKOUT ACTIVE";


    startWorkoutBtn.disabled = true;


    attachSetButtons();


    const finishButton =
        document.getElementById(
            "finishWorkoutBtn"
        );


    if (finishButton) {

        finishButton.addEventListener(
            "click",
            finishWorkout
        );

    }


    updateWorkoutTimer();

}


// ---------- SET BUTTONS ----------

function attachSetButtons() {

    const buttons =
        document.querySelectorAll(
            ".set-button"
        );


    buttons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const exerciseIndex =
                    Number(
                        button.dataset.exercise
                    );


                const setNumber =
                    Number(
                        button.dataset.set
                    );


                const exercise =
                    activeWorkout
                        .exercises[
                            exerciseIndex
                        ];


                if (
                    setNumber ===
                    exercise.completedSets + 1
                ) {

                    exercise.completedSets++;


                    renderActiveWorkout();

                }

            }
        );

    });

}


// ---------- FINISH WORKOUT ----------

function finishWorkout() {

    if (!activeWorkout) {
        return;
    }


    const endTime =
        Date.now();


    const duration =
        Math.max(
            1,
            Math.round(
                (
                    endTime -
                    activeWorkout.startTime
                ) / 60000
            )
        );


    const completedExerciseData =
        activeWorkout.exercises.map(
            exercise => ({

                id: exercise.id,

                name: exercise.name,

                completedSets:
                    exercise.completedSets,

                plannedSets:
                    Number(
                        exercise.defaultSets
                    ) || 1

            })
        );


    const session = {

        id:
            Date.now(),

        date:
            new Date().toISOString(),

        day:
            activeWorkout.day,

        category:
            activeWorkout.category,

        duration:

            duration,

        exercises:
            completedExerciseData

    };


    // STOP TIMER FIRST

    stopWorkoutTimer();


    // SAVE EXACTLY ONCE

    const saved =
        saveSession(session);


    if (!saved) {

        alert(
            "Could not save the workout."
        );

        return;
    }


    completedSessions =
        getStoredSessions();


    // RESET WORKOUT STATE

    activeWorkout = null;

    workoutStartTime = null;

    currentSession = [];


    startWorkoutBtn.disabled =
        false;

    startWorkoutBtn.textContent =
        "START SESSION";


    sessionTitle.textContent =
        `${currentDay} — ` +
        `${weeklyStructure[currentDay].category}`;


    updateStatistics();

    renderTrainingHistory();

    renderExercises(
        weeklyStructure[currentDay]
            .category
    );


    alert(

        `WORKOUT COMPLETE ✓\n\n` +

        `${session.day} — ` +
        `${session.category}\n\n` +

        `Exercises: ` +
        `${session.exercises.length}\n` +

        `Duration: ` +
        `${session.duration} min`

    );

}


// ---------- DAY SELECTION ----------

dayCards.forEach(card => {

    card.addEventListener(
        "click",
        () => {

            const day =
                card.dataset.day;

            selectDay(day);

        }
    );

});


function selectDay(day) {

    if (!weeklyStructure[day]) {
        return;
    }


    // Don't destroy an active workout accidentally

    if (activeWorkout) {

        alert(
            "Finish the active workout before changing days."
        );

        return;
    }


    currentDay = day;

    currentSession = [];


    // Active visual state

    dayCards.forEach(card => {

        card.classList.remove(
            "active"
        );

    });


    const selectedCard =
        document.querySelector(
            `.day-card[data-day="${day}"]`
        );


    if (selectedCard) {

        selectedCard.classList.add(
            "active"
        );

    }


    const structure =
        weeklyStructure[day];


    // TODAY CARD

    if (todayCategory) {

        todayCategory.textContent =
            structure.category;

    }


    if (todayDescription) {

        todayDescription.textContent =
            structure.description;

    }


    // SESSION TITLE

    if (sessionTitle) {

        sessionTitle.textContent =
            `${day} — ${structure.category}`;

    }


    // START BUTTON

    startWorkoutBtn.disabled =
        false;

    startWorkoutBtn.textContent =
        "START SESSION";


    // RENDER EXERCISES

    renderExercises(
        structure.category
    );

}


// ---------- STATISTICS ----------

function updateStatistics() {

    // Completed training days

    if (trainingDays) {

        const uniqueDays =
            new Set(
                completedSessions.map(
                    session =>
                        session.day
                )
            );


        trainingDays.textContent =
            uniqueDays.size;

    }


    // Exercise database count

    if (exerciseCount) {

        exerciseCount.textContent =
            window.exerciseDatabase
                ? window.exerciseDatabase.length
                : 0;

    }


    // Completed sessions

    if (sessionCount) {

        sessionCount.textContent =
            completedSessions.length;

    }

}


// ---------- TRAINING HISTORY ----------

function renderTrainingHistory() {

    const historyList =
        document.getElementById(
            "historyList"
        );


    if (!historyList) {
        return;
    }


    const sessions =
        getStoredSessions();


    if (sessions.length === 0) {

        historyList.innerHTML = `

            <div class="empty-state">

                <h3>
                    No training history yet
                </h3>

                <p>
                    Complete your first workout
                    and it will appear here.
                </p>

            </div>

        `;

        return;
    }


    const newestFirst =
        [...sessions].reverse();


    let html = "";


    newestFirst.forEach(
        session => {

            const date =
                new Date(
                    session.date
                );


            const readableDate =
                date.toLocaleDateString(
                    undefined,
                    {
                        day: "numeric",
                        month: "short",
                        year: "numeric"
                    }
                );


            const totalExercises =
                session.exercises
                    ? session.exercises.length
                    : 0;


            html += `

                <div class="history-card">

                    <div class="history-main">

                        <span class="history-day">
                            ${session.day}
                        </span>

                        <h3>
                            ${session.category}
                        </h3>

                        <p>
                            ${readableDate}
                        </p>

                    </div>


                    <div class="history-stats">

                        <div>

                            <strong>
                                ${totalExercises}
                            </strong>

                            <span>
                                Exercises
                            </span>

                        </div>


                        <div>

                            <strong>
                                ${session.duration || 0}
                            </strong>

                            <span>
                                Minutes
                            </span>

                        </div>

                    </div>


                    <span class="history-complete">
                        ✓ COMPLETED
                    </span>

                </div>

            `;

        }
    );


    historyList.innerHTML =
        html;

}


// ---------- INITIALIZE ----------

function initializeApp() {

    completedSessions =
        getStoredSessions();


    updateStatistics();


    selectDay("Monday");


    renderTrainingHistory();

}


initializeApp();


// Register service worker for offline support
if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("./service-worker.js")
            .then(() => {
                console.log("HPL service worker registered.");
            })
            .catch(error => {
                console.error("Service worker registration failed:", error);
            });
    });
}