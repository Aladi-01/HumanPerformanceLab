/* =========================================================
   HUMAN PERFORMANCE LAB
   MAIN APPLICATION ENGINE
========================================================= */


/* =========================================================
   WEEKLY STRUCTURE
========================================================= */

const weeklyStructure = {

    Monday: {
        category: "Push",
        description:
            "Upper-body pushing strength and control."
    },

    Tuesday: {
        category: "Pull",
        description:
            "Back, pulling strength, grip and control."
    },

    Wednesday: {
        category: "Legs + Core",
        description:
            "Lower-body strength, stability and core control."
    },

    Thursday: {
        category: "Flexibility + Mobility",
        description:
            "Movement quality, mobility and flexibility."
    },

    Friday: {
        category: "Stability",
        description:
            "Balance, coordination and joint control."
    },

    Saturday: {
        category: "Endurance",
        description:
            "Cardiovascular endurance and work capacity."
    },

    Sunday: {
        category: "Recovery",
        description:
            "Low-intensity movement and recovery."
    }

};


/* =========================================================
   STATE
========================================================= */

let currentDay = getTodayName();

let currentSession = [];

let completedSessions = getStoredSessions();

let activeWorkout = null;

let workoutTimer = null;

let workoutStartTime = null;

let currentExerciseIndex = 0;

let deferredInstallPrompt = null;

let selectedExerciseForModal = null;


/* =========================================================
   DOM
========================================================= */

const screens = document.querySelectorAll(".screen");

const navItems =
    document.querySelectorAll(".nav-item");

const weekGrid =
    document.getElementById("weekGrid");

const exerciseGrid =
    document.getElementById("exerciseGrid");

const selectedSession =
    document.getElementById("selectedSession");

const exerciseScreenTitle =
    document.getElementById("exerciseScreenTitle");

const selectedSessionTitle =
    document.getElementById("selectedSessionTitle");

const selectedCount =
    document.getElementById("selectedCount");

const trainingDays =
    document.getElementById("trainingDays");

const exerciseCount =
    document.getElementById("exerciseCount");

const sessionCount =
    document.getElementById("sessionCount");

const todayTitle =
    document.getElementById("todayTitle");

const todayDay =
    document.getElementById("todayDay");

const todayFocus =
    document.getElementById("todayFocus");

const todayDescription =
    document.getElementById("todayDescription");

const tomorrowDay =
    document.getElementById("tomorrowDay");

const tomorrowFocus =
    document.getElementById("tomorrowFocus");

const tomorrowDescription =
    document.getElementById("tomorrowDescription");

const todayStartButton =
    document.getElementById("todayStartButton");

const todayOpenButton =
    document.getElementById("todayOpenButton");

const saveSessionButton =
    document.getElementById("saveSessionButton");

const startWorkoutButton =
    document.getElementById("startWorkoutButton");

const historyList =
    document.getElementById("historyList");

const exerciseModal =
    document.getElementById("exerciseModal");

const modalClose =
    document.getElementById("modalClose");

const modalExerciseTitle =
    document.getElementById("modalExerciseTitle");

const modalExerciseCategory =
    document.getElementById("modalExerciseCategory");

const modalExerciseBody =
    document.getElementById("modalExerciseBody");

const modalAddExercise =
    document.getElementById("modalAddExercise");

const workoutScreen =
    document.getElementById("workoutScreen");

const activeWorkoutTitle =
    document.getElementById("activeWorkoutTitle");

const workoutTimerElement =
    document.getElementById("workoutTimer");

const activeWorkoutContent =
    document.getElementById("activeWorkoutContent");

const workoutProgressText =
    document.getElementById("workoutProgressText");

const workoutProgressBar =
    document.getElementById("workoutProgressBar");

const completeSetButton =
    document.getElementById("completeSetButton");

const nextExerciseButton =
    document.getElementById("nextExerciseButton");

const finishWorkoutButton =
    document.getElementById("finishWorkoutButton");

const exitWorkoutButton =
    document.getElementById("exitWorkoutButton");

const installButton =
    document.getElementById("installButton");

const profileInstallButton =
    document.getElementById("profileInstallButton");

const installStatus =
    document.getElementById("installStatus");

const profileGoalText =
    document.getElementById("profileGoalText");

const goalOptions =
    document.querySelectorAll(".goal-option");


/* =========================================================
   HELPERS
========================================================= */

function getTodayName() {

    const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];

    return days[new Date().getDay()];
}


function getTomorrowName() {

    const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];

    return days[
        (new Date().getDay() + 1) % 7
    ];
}


function escapeHTML(value) {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}


/* =========================================================
   SCREEN NAVIGATION
========================================================= */

function openScreen(screenId) {

    screens.forEach(screen => {

        screen.classList.remove(
            "active-screen"
        );

    });


    const target =
        document.getElementById(screenId);

    if (target) {

        target.classList.add(
            "active-screen"
        );

    }


    navItems.forEach(item => {

        item.classList.toggle(
            "active",
            item.dataset.screen === screenId
        );

    });


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });


    if (screenId === "historyScreen") {

        renderHistory();

    }


    if (screenId === "profileScreen") {

        loadProfile();

    }

}


/* =========================================================
   NAV EVENTS
========================================================= */

navItems.forEach(item => {

    item.addEventListener(
        "click",
        () => {

            openScreen(
                item.dataset.screen
            );

        }
    );

});


/* =========================================================
   TODAY
========================================================= */

function initializeToday() {

    currentDay = getTodayName();

    updateTodayUI();

    updateTomorrowUI();

    renderWeek();

    selectDay(
        currentDay,
        false
    );

}


function updateTodayUI() {

    const structure =
        weeklyStructure[currentDay];

    if (!structure) return;

    if (todayDay) {

        todayDay.textContent =
            currentDay.slice(0, 3);

    }

    if (todayTitle) {

        todayTitle.textContent =
            `${currentDay} Training`;

    }

    if (todayFocus) {

        todayFocus.textContent =
            structure.category;

    }

    if (todayDescription) {

        todayDescription.textContent =
            structure.description;

    }

}


function updateTomorrowUI() {

    const tomorrow =
        getTomorrowName();

    const structure =
        weeklyStructure[tomorrow];

    if (!structure) return;

    if (tomorrowDay) {

        tomorrowDay.textContent =
            tomorrow.slice(0, 3);

    }

    if (tomorrowFocus) {

        tomorrowFocus.textContent =
            structure.category;

    }

    if (tomorrowDescription) {

        tomorrowDescription.textContent =
            structure.description;

    }

}


/* =========================================================
   WEEK
========================================================= */

function renderWeek() {

    if (!weekGrid) return;

    weekGrid.innerHTML = "";

    Object.entries(
        weeklyStructure
    ).forEach(([day, structure]) => {

        const button =
            document.createElement("button");

        button.className =
            "day-card";

        if (day === currentDay) {

            button.classList.add(
                "active"
            );

        }

        button.dataset.day = day;

        button.innerHTML = `

            <span class="day-name">
                ${escapeHTML(day.slice(0, 3))}
            </span>

            <strong>
                ${escapeHTML(structure.category)}
            </strong>

            <span>
                ${escapeHTML(structure.description)}
            </span>

        `;


        button.addEventListener(
            "click",
            () => {

                selectDay(day);

                openScreen(
                    "exercisesScreen"
                );

            }
        );


        weekGrid.appendChild(button);

    });

}


/* =========================================================
   SELECT DAY
========================================================= */

function selectDay(
    day,
    clearSession = true
) {

    if (!weeklyStructure[day]) {
        return;
    }


    currentDay = day;


    if (clearSession) {

        currentSession = [];

    }


    renderWeek();

    renderExercises();

    updateExerciseScreen();

}


/* =========================================================
   EXERCISES
========================================================= */

function getExercisesForCurrentDay() {

    if (!window.exerciseDatabase) {

        console.error(
            "Exercise database not found."
        );

        return [];

    }


    return window.exerciseDatabase.filter(
        exercise =>
            exercise.category ===
            weeklyStructure[currentDay].category
    );

}


function updateExerciseScreen() {

    const structure =
        weeklyStructure[currentDay];

    if (!structure) return;


    if (exerciseScreenTitle) {

        exerciseScreenTitle.textContent =
            `${currentDay} — ${structure.category}`;

    }

    if (selectedSessionTitle) {

        selectedSessionTitle.textContent =
            `${currentDay} Session`;

    }

}


/* =========================================================
   RENDER EXERCISES
========================================================= */

function renderExercises() {

    updateExerciseScreen();


    if (!exerciseGrid) return;


    const exercises =
        getExercisesForCurrentDay();


    if (exercises.length === 0) {

        exerciseGrid.innerHTML = `

            <div class="empty-state">

                <strong>
                    No exercises found
                </strong>

                <span>
                    Add exercises to the database
                    for this category.
                </span>

            </div>

        `;

        return;

    }


    exerciseGrid.innerHTML =
        exercises.map(exercise => {

            const added =
                currentSession.some(
                    item =>
                        item.id === exercise.id
                );


            return `

                <article
                    class="exercise-card"
                >

                    <div class="exercise-top">

                        <div>

                            <h3>
                                ${escapeHTML(exercise.name)}
                            </h3>

                            <span
                                class="exercise-movement"
                            >
                                ${escapeHTML(exercise.movement)}
                            </span>

                        </div>

                    </div>


                    <p class="exercise-meta">

                        ${escapeHTML(
                            exercise.notes ||
                            "Controlled movement with good technique."
                        )}

                    </p>


                    <div
                        class="exercise-tags"
                    >

                        <span
                            class="exercise-tag"
                        >
                            ${escapeHTML(
                                exercise.difficulty
                            )}
                        </span>

                        <span
                            class="exercise-tag"
                        >
                            ${escapeHTML(
                                exercise.equipment
                            )}
                        </span>

                        <span
                            class="exercise-tag"
                        >
                            ${escapeHTML(
                                exercise.defaultSets
                            )} sets
                        </span>

                    </div>


                    <div
                        class="exercise-actions"
                    >

                        <button
                            class="small-button view-exercise-button"
                            data-id="${exercise.id}"
                        >
                            VIEW
                        </button>

                        <button
                            class="small-button add-exercise-button"
                            data-id="${exercise.id}"
                            ${added ? "disabled" : ""}
                        >
                            ${
                                added
                                    ? "ADDED ✓"
                                    : "ADD"
                            }
                        </button>

                    </div>

                </article>

            `;

        }).join("");


    attachExerciseEvents();

    renderSelectedSession();

}


/* =========================================================
   EXERCISE EVENTS
========================================================= */

function attachExerciseEvents() {

    document
        .querySelectorAll(
            ".view-exercise-button"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    openExerciseModal(
                        button.dataset.id
                    );

                }
            );

        });


    document
        .querySelectorAll(
            ".add-exercise-button"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    addExercise(
                        button.dataset.id
                    );

                }
            );

        });

}


/* =========================================================
   ADD EXERCISE
========================================================= */

function addExercise(id) {

    const exercise =
        window.exerciseDatabase.find(
            item => item.id === id
        );


    if (!exercise) return;


    const exists =
        currentSession.some(
            item => item.id === id
        );


    if (exists) return;


    currentSession.push(
        exercise
    );


    renderExercises();

}


/* =========================================================
   REMOVE EXERCISE
========================================================= */

function removeExercise(id) {

    currentSession =
        currentSession.filter(
            exercise =>
                exercise.id !== id
        );


    renderExercises();

}


/* =========================================================
   SELECTED SESSION
========================================================= */

function renderSelectedSession() {

    if (!selectedSession) return;


    if (selectedCount) {

        selectedCount.textContent =
            currentSession.length;

    }


    if (
        currentSession.length === 0
    ) {

        selectedSession.innerHTML = `

            <div class="empty-state">

                <strong>
                    No exercises selected
                </strong>

                <span>
                    Add exercises above to
                    build your workout.
                </span>

            </div>

        `;

        return;

    }


    selectedSession.innerHTML =
        currentSession.map(
            (exercise, index) => `

                <div
                    class="selected-item"
                >

                    <div>

                        <strong>
                            ${index + 1}.
                            ${escapeHTML(
                                exercise.name
                            )}
                        </strong>

                        <span>
                            ${escapeHTML(
                                exercise.defaultSets
                            )}
                            sets ×
                            ${escapeHTML(
                                exercise.defaultReps
                            )}
                            • Rest:
                            ${escapeHTML(
                                exercise.rest
                            )}
                        </span>

                    </div>


                    <button
                        class="remove-button"
                        data-remove-id="${exercise.id}"
                    >
                        REMOVE
                    </button>

                </div>

            `
        ).join("");


    document
        .querySelectorAll(
            "[data-remove-id]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    removeExercise(
                        button.dataset.removeId
                    );

                }
            );

        });

}


/* =========================================================
   SAVE SESSION PLAN
========================================================= */

function saveCurrentSessionPlan() {

    if (currentSession.length === 0) {

        alert(
            "Add at least one exercise first."
        );

        return;

    }


    const planKey =
        "hpl_current_plan";


    const plan = {

        day: currentDay,

        category:
            weeklyStructure[
                currentDay
            ].category,

        exercises:
            currentSession.map(
                exercise => exercise.id
            ),

        savedAt:
            new Date().toISOString()

    };


    localStorage.setItem(
        planKey,
        JSON.stringify(plan)
    );


    alert(
        `${currentDay} session saved ✓`
    );

}


/* =========================================================
   LOAD SAVED SESSION
========================================================= */

function loadSavedSession() {

    try {

        const raw =
            localStorage.getItem(
                "hpl_current_plan"
            );


        if (!raw) return;


        const plan =
            JSON.parse(raw);


        if (
            plan.day !== currentDay
        ) {

            return;

        }


        if (
            !Array.isArray(
                plan.exercises
            )
        ) {

            return;

        }


        currentSession =
            plan.exercises
                .map(id =>
                    window.exerciseDatabase.find(
                        exercise =>
                            exercise.id === id
                    )
                )
                .filter(Boolean);


    } catch (error) {

        console.error(
            "Could not load saved plan:",
            error
        );

    }

}


/* =========================================================
   EXERCISE MODAL
========================================================= */

function openExerciseModal(id) {

    const exercise =
        window.exerciseDatabase.find(
            item => item.id === id
        );


    if (!exercise) return;


    selectedExerciseForModal =
        exercise;


    modalExerciseTitle.textContent =
        exercise.name;

    modalExerciseCategory.textContent =
        exercise.category;


    modalExerciseBody.innerHTML = `

        <p>
            ${escapeHTML(
                exercise.notes ||
                "Use controlled technique and stop if something hurts."
            )}
        </p>


        <div class="modal-row">

            <div class="modal-stat">

                <span>MOVEMENT</span>

                <strong>
                    ${escapeHTML(
                        exercise.movement
                    )}
                </strong>

            </div>


            <div class="modal-stat">

                <span>DIFFICULTY</span>

                <strong>
                    ${escapeHTML(
                        exercise.difficulty
                    )}
                </strong>

            </div>


            <div class="modal-stat">

                <span>SETS</span>

                <strong>
                    ${escapeHTML(
                        exercise.defaultSets
                    )}
                </strong>

            </div>


            <div class="modal-stat">

                <span>REPS / TIME</span>

                <strong>
                    ${escapeHTML(
                        exercise.defaultReps
                    )}
                </strong>

            </div>

        </div>


        <p>
            <strong>Muscles:</strong>
            ${escapeHTML(
                exercise.muscles.join(", ")
            )}
        </p>


        <p>
            <strong>Equipment:</strong>
            ${escapeHTML(
                exercise.equipment
            )}
        </p>


        <p>
            <strong>Progression:</strong>
            ${escapeHTML(
                exercise.progression
            )}
        </p>


        <p>
            <strong>Regression:</strong>
            ${escapeHTML(
                exercise.regression
            )}
        </p>

    `;


    const alreadyAdded =
        currentSession.some(
            item =>
                item.id === exercise.id
        );


    modalAddExercise.textContent =
        alreadyAdded
            ? "ALREADY IN SESSION"
            : "ADD TO SESSION";


    modalAddExercise.disabled =
        alreadyAdded;


    exerciseModal.classList.remove(
        "hidden"
    );

}


function closeExerciseModal() {

    exerciseModal.classList.add(
        "hidden"
    );

    selectedExerciseForModal =
        null;

}


modalClose.addEventListener(
    "click",
    closeExerciseModal
);


document
    .querySelector(".modal-backdrop")
    .addEventListener(
        "click",
        closeExerciseModal
);


modalAddExercise.addEventListener(
    "click",
    () => {

        if (
            selectedExerciseForModal
        ) {

            addExercise(
                selectedExerciseForModal.id
            );

            closeExerciseModal();

        }

    }
);


/* =========================================================
   WORKOUT
========================================================= */

function startWorkout() {

    if (
        currentSession.length === 0
    ) {

        alert(
            "Add exercises to your session first."
        );

        return;

    }


    activeWorkout = {

        id: Date.now(),

        day: currentDay,

        category:
            weeklyStructure[
                currentDay
            ].category,

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


    currentExerciseIndex = 0;

    workoutStartTime =
        activeWorkout.startTime;


    startWorkoutTimer();

    renderActiveWorkout();


    workoutScreen.classList.remove(
        "hidden"
    );


    document.body.style.overflow =
        "hidden";

}


/* =========================================================
   WORKOUT TIMER
========================================================= */

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

    if (
        !workoutStartTime
    ) {

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
            (totalSeconds % 3600) /
            60
        );


    const seconds =
        totalSeconds % 60;


    if (workoutTimerElement) {

        workoutTimerElement.textContent =
            `${String(hours).padStart(2, "0")}:` +
            `${String(minutes).padStart(2, "0")}:` +
            `${String(seconds).padStart(2, "0")}`;

    }

}


/* =========================================================
   ACTIVE WORKOUT RENDER
========================================================= */

function renderActiveWorkout() {

    if (!activeWorkout) {
        return;
    }


    const exercises =
        activeWorkout.exercises;


    const current =
        exercises[
            currentExerciseIndex
        ];


    if (!current) return;


    activeWorkoutTitle.textContent =
        `${activeWorkout.day} — ${activeWorkout.category}`;


    const totalSets =
        Number(
            current.defaultSets
        ) || 1;


    const completedSets =
        current.completedSets;


    activeWorkoutContent.innerHTML = `

        ${exercises.map(
            (exercise, index) => {

                const sets =
                    Number(
                        exercise.defaultSets
                    ) || 1;

                const completed =
                    exercise.completedSets;

                const isCurrent =
                    index ===
                    currentExerciseIndex;


                return `

                    <article
                        class="
                            active-exercise-card
                            ${isCurrent ? "current" : ""}
                        "
                    >

                        <div
                            class="active-exercise-number"
                        >
                            EXERCISE ${index + 1}
                        </div>


                        <h2>
                            ${escapeHTML(
                                exercise.name
                            )}
                        </h2>


                        <p>
                            ${escapeHTML(
                                exercise.defaultReps
                            )}
                            • Rest:
                            ${escapeHTML(
                                exercise.rest
                            )}
                        </p>


                        <div
                            class="set-indicators"
                        >

                            ${Array.from(
                                { length: sets },
                                (_, setIndex) => {

                                    const setNumber =
                                        setIndex + 1;

                                    let className =
                                        "set-indicator";

                                    if (
                                        setNumber <=
                                        completed
                                    ) {

                                        className +=
                                            " done";

                                    } else if (
                                        setNumber ===
                                        completed + 1 &&
                                        isCurrent
                                    ) {

                                        className +=
                                            " current";

                                    }


                                    return `

                                        <div
                                            class="${className}"
                                        >
                                            ${
                                                setNumber <=
                                                completed
                                                    ? `✓ SET ${setNumber}`
                                                    : `SET ${setNumber}`
                                            }
                                        </div>

                                    `;

                                }
                            ).join("")}

                        </div>

                    </article>

                `;

            }
        ).join("")}

    `;


    const totalPossibleSets =
        exercises.reduce(
            (total, exercise) =>
                total +
                (
                    Number(
                        exercise.defaultSets
                    ) || 1
                ),
            0
        );


    const completedTotal =
        exercises.reduce(
            (total, exercise) =>
                total +
                exercise.completedSets,
            0
        );


    const percentage =
        totalPossibleSets === 0
            ? 0
            : Math.round(
                (
                    completedTotal /
                    totalPossibleSets
                ) * 100
            );


    workoutProgressText.textContent =
        `${percentage}%`;

    workoutProgressBar.style.width =
        `${percentage}%`;


    completeSetButton.disabled =
        completedSets >= totalSets;


    completeSetButton.textContent =
        completedSets >= totalSets
            ? "SETS COMPLETE"
            : `COMPLETE SET ${completedSets + 1}`;


    nextExerciseButton.disabled =
        currentExerciseIndex >=
        exercises.length - 1;

}


/* =========================================================
   COMPLETE SET
========================================================= */

function completeCurrentSet() {

    if (!activeWorkout) return;


    const exercise =
        activeWorkout.exercises[
            currentExerciseIndex
        ];


    if (!exercise) return;


    const plannedSets =
        Number(
            exercise.defaultSets
        ) || 1;


    if (
        exercise.completedSets >=
        plannedSets
    ) {

        return;

    }


    exercise.completedSets++;


    renderActiveWorkout();

}


/* =========================================================
   NEXT EXERCISE
========================================================= */

function nextExercise() {

    if (!activeWorkout) return;


    if (
        currentExerciseIndex >=
        activeWorkout.exercises.length - 1
    ) {

        return;

    }


    currentExerciseIndex++;


    renderActiveWorkout();

}


/* =========================================================
   EXIT WORKOUT
========================================================= */

function exitWorkout() {

    if (!activeWorkout) {

        workoutScreen.classList.add(
            "hidden"
        );

        document.body.style.overflow =
            "";

        return;

    }


    const leave =
        confirm(
            "Leave this active workout? Your current progress will not be saved."
        );


    if (!leave) return;


    stopWorkoutTimer();


    activeWorkout = null;

    workoutStartTime = null;

    workoutScreen.classList.add(
        "hidden"
    );

    document.body.style.overflow =
        "";

}


/* =========================================================
   FINISH WORKOUT
========================================================= */

function finishWorkout() {

    if (!activeWorkout) return;


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


    const duration =
        Math.max(
            1,
            Math.round(
                (
                    Date.now() -
                    activeWorkout.startTime
                ) / 60000
            )
        );


    const session = {

        id: Date.now(),

        date:
            new Date().toISOString(),

        day:
            activeWorkout.day,

        category:
            activeWorkout.category,

        duration,

        exercises:
            completedExerciseData

    };


    saveSession(
        session
    );


    completedSessions =
        getStoredSessions();


    stopWorkoutTimer();


    activeWorkout = null;

    workoutStartTime = null;

    currentExerciseIndex = 0;

    currentSession = [];


    workoutScreen.classList.add(
        "hidden"
    );

    document.body.style.overflow =
        "";


    updateStatistics();

    renderHistory();

    renderExercises();


    alert(
        `WORKOUT COMPLETE ✓\n\n` +
        `${session.day} — ${session.category}\n\n` +
        `Exercises: ${session.exercises.length}\n` +
        `Duration: ${session.duration} min`
    );


    openScreen(
        "historyScreen"
    );

}


/* =========================================================
   WORKOUT BUTTONS
========================================================= */

startWorkoutButton.addEventListener(
    "click",
    startWorkout
);

saveSessionButton.addEventListener(
    "click",
    saveCurrentSessionPlan
);

completeSetButton.addEventListener(
    "click",
    completeCurrentSet
);

nextExerciseButton.addEventListener(
    "click",
    nextExercise
);

finishWorkoutButton.addEventListener(
    "click",
    finishWorkout
);

exitWorkoutButton.addEventListener(
    "click",
    exitWorkout
);


/* =========================================================
   HISTORY
========================================================= */

function renderHistory() {

    if (!historyList) return;


    const sessions =
        getStoredSessions()
            .slice()
            .reverse();


    if (sessions.length === 0) {

        historyList.innerHTML = `

            <div class="empty-state">

                <strong>
                    No completed sessions yet
                </strong>

                <span>
                    Complete your first workout
                    and it will appear here.
                </span>

            </div>

        `;

        return;

    }


    historyList.innerHTML =
        sessions.map(session => {

            const totalSets =
                (session.exercises || [])
                    .reduce(
                        (sum, exercise) =>
                            sum +
                            Number(
                                exercise.completedSets
                            || 0),
                        0
                    );


            const plannedSets =
                (session.exercises || [])
                    .reduce(
                        (sum, exercise) =>
                            sum +
                            Number(
                                exercise.plannedSets
                            || 0),
                        0
                    );


            const completion =
                plannedSets === 0
                    ? 0
                    : Math.round(
                        (
                            totalSets /
                            plannedSets
                        ) * 100
                    );


            const date =
                new Date(
                    session.date
                );


            const readableDate =
                Number.isNaN(
                    date.getTime()
                )
                    ? "Unknown date"
                    : date.toLocaleDateString(
                        undefined,
                        {
                            day: "numeric",
                            month: "short",
                            year: "numeric"
                        }
                    );


            return `

                <article
                    class="history-card"
                >

                    <div class="history-top">

                        <div>

                            <h3>
                                ${escapeHTML(
                                    session.day
                                )}
                                —
                                ${escapeHTML(
                                    session.category
                                )}
                            </h3>

                            <p>
                                ${readableDate}
                            </p>

                        </div>

                    </div>


                    <div
                        class="history-metrics"
                    >

                        <div
                            class="history-metric"
                        >

                            <span>
                                EXERCISES
                            </span>

                            <strong>
                                ${
                                    session.exercises
                                        ?.length || 0
                                }
                            </strong>

                        </div>


                        <div
                            class="history-metric"
                        >

                            <span>
                                DURATION
                            </span>

                            <strong>
                                ${
                                    session.duration || 0
                                } min
                            </strong>

                        </div>


                        <div
                            class="history-metric"
                        >

                            <span>
                                SETS
                            </span>

                            <strong>
                                ${completion}%
                            </strong>

                        </div>

                    </div>

                </article>

            `;

        }).join("");

}


/* =========================================================
   STATISTICS
========================================================= */

function updateStatistics() {

    if (trainingDays) {

        trainingDays.textContent =
            Object.keys(
                weeklyStructure
            ).length;

    }


    if (exerciseCount) {

        exerciseCount.textContent =
            window.exerciseDatabase
                ? window.exerciseDatabase.length
                : 0;

    }


    if (sessionCount) {

        sessionCount.textContent =
            getStoredSessions().length;

    }

}


/* =========================================================
   PROFILE
========================================================= */

function loadProfile() {

    const goal =
        localStorage.getItem(
            "hpl_goal"
        ) ||
        "General Performance";


    if (profileGoalText) {

        profileGoalText.textContent =
            goal;

    }


    goalOptions.forEach(option => {

        option.classList.toggle(
            "active",
            option.dataset.goal === goal
        );

    });

}


goalOptions.forEach(option => {

    option.addEventListener(
        "click",
        () => {

            const goal =
                option.dataset.goal;


            localStorage.setItem(
                "hpl_goal",
                goal
            );


            loadProfile();

        }
    );

});


/* =========================================================
   PWA INSTALLATION
========================================================= */

function isStandalone() {

    return (
        window.matchMedia(
            "(display-mode: standalone)"
        ).matches
        ||
        window.navigator.standalone === true
    );

}


function showInstallButtons() {

    if (installButton) {

        installButton.classList.remove(
            "hidden"
        );

    }

    if (profileInstallButton) {

        profileInstallButton.classList.remove(
            "hidden"
        );

    }

}


function hideInstallButtons() {

    if (installButton) {

        installButton.classList.add(
            "hidden"
        );

    }

    if (profileInstallButton) {

        profileInstallButton.classList.add(
            "hidden"
        );

    }

}


function updateInstallStatus(
    message
) {

    if (installStatus) {

        installStatus.textContent =
            message;

    }

}


window.addEventListener(
    "beforeinstallprompt",
    event => {

        event.preventDefault();

        deferredInstallPrompt =
            event;


        showInstallButtons();

        updateInstallStatus(
            "HPL is ready to install."
        );

    }
);


async function installHPL() {

    if (
        !deferredInstallPrompt
    ) {

        updateInstallStatus(
            "Use your browser menu → Add to Home Screen / Install HPL."
        );

        return;

    }


    deferredInstallPrompt.prompt();


    try {

        const result =
            await deferredInstallPrompt.userChoice;


        if (
            result.outcome ===
            "accepted"
        ) {

            updateInstallStatus(
                "Installing HPL..."
            );

        } else {

            updateInstallStatus(
                "Installation cancelled. You can install later."
            );

        }

    } catch (error) {

        console.error(
            "Install prompt error:",
            error
        );

    }


    deferredInstallPrompt =
        null;

}


window.addEventListener(
    "appinstalled",
    () => {

        deferredInstallPrompt =
            null;

        hideInstallButtons();

        updateInstallStatus(
            "HPL is installed on this device ✓"
        );

    }
);


if (installButton) {

    installButton.addEventListener(
        "click",
        installHPL
    );

}


if (profileInstallButton) {

    profileInstallButton.addEventListener(
        "click",
        installHPL
    );

}


function initializeInstallationUI() {

    if (isStandalone()) {

        hideInstallButtons();

        updateInstallStatus(
            "HPL is installed and running as an app ✓"
        );

        return;

    }


    updateInstallStatus(
        "Checking whether this browser supports installation..."
    );


    setTimeout(() => {

        if (
            !deferredInstallPrompt
        ) {

            updateInstallStatus(
                "Install from your browser menu when available."
            );

        }

    }, 1800);

}


/* =========================================================
   SERVICE WORKER
========================================================= */

function registerServiceWorker() {

    if (
        "serviceWorker" in navigator
    ) {

        window.addEventListener(
            "load",
            () => {

                navigator.serviceWorker
                    .register(
                        "./service-worker.js"
                    )
                    .then(
                        registration => {

                            console.log(
                                "HPL service worker registered:",
                                registration.scope
                            );

                        }
                    )
                    .catch(
                        error => {

                            console.error(
                                "HPL service worker registration failed:",
                                error
                            );

                        }
                    );

            }
        );

    }

}


/* =========================================================
   HOME BUTTONS
========================================================= */

function openTodayTraining() {

    selectDay(
        getTodayName()
    );

    openScreen(
        "exercisesScreen"
    );

}


if (todayStartButton) {

    todayStartButton.addEventListener(
        "click",
        openTodayTraining
    );

}


if (todayOpenButton) {

    todayOpenButton.addEventListener(
        "click",
        openTodayTraining
    );

}


/* =========================================================
   INITIALIZE
========================================================= */

function initializeApp() {

    initializeToday();

    loadSavedSession();

    renderExercises();

    updateStatistics();

    renderHistory();

    loadProfile();

    initializeInstallationUI();

    registerServiceWorker();

}


initializeApp();