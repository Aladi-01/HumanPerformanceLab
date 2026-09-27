const exercises = [

    // =========================================
    // PUSH
    // =========================================

    {
        id: "push-up",
        name: "Push-Up",
        category: "Push",
        movement: "Horizontal Push",

        muscles: [
            "Chest",
            "Triceps",
            "Front Delts",
            "Core"
        ],

        equipment: "Bodyweight",
        difficulty: "Beginner",
        skill: "Low",

        defaultSets: 3,
        defaultReps: "8–15",
        rest: "60–120 sec",

        progression:
            "Increase reps → slower eccentric → pause → harder variation",

        regression:
            "Incline push-up",

        notes:
            "Keep the body rigid and control the descent."
    },


    {
        id: "pike-push-up",
        name: "Pike Push-Up",
        category: "Push",
        movement: "Vertical Push",

        muscles: [
            "Shoulders",
            "Triceps",
            "Upper Chest",
            "Core"
        ],

        equipment: "Bodyweight",
        difficulty: "Intermediate",
        skill: "Moderate",

        defaultSets: 3,
        defaultReps: "6–12",
        rest: "90–150 sec",

        progression:
            "Increase range → elevate feet → progress toward handstand push-up",

        regression:
            "High-incline pike push-up",

        notes:
            "Maintain control and avoid collapsing through the shoulders."
    },


    {
        id: "diamond-push-up",
        name: "Diamond Push-Up",
        category: "Push",
        movement: "Horizontal Push",

        muscles: [
            "Triceps",
            "Chest",
            "Front Delts"
        ],

        equipment: "Bodyweight",
        difficulty: "Intermediate",
        skill: "Low",

        defaultSets: 2,
        defaultReps: "6–12",
        rest: "90 sec",

        progression:
            "Increase reps → slow eccentric → feet elevated",

        regression:
            "Close-grip incline push-up",

        notes:
            "Use only if the wrist and shoulder position feels comfortable."
    },


    // =========================================
    // PULL
    // =========================================

    {
        id: "pull-up",
        name: "Pull-Up",
        category: "Pull",
        movement: "Vertical Pull",

        muscles: [
            "Lats",
            "Biceps",
            "Upper Back",
            "Forearms",
            "Core"
        ],

        equipment: "Pull-Up Bar",
        difficulty: "Advanced",
        skill: "High",

        defaultSets: 3,
        defaultReps: "3–8",
        rest: "120–180 sec",

        progression:
            "Increase reps → add load → slower eccentric",

        regression:
            "Negative pull-up / assisted pull-up",

        notes:
            "Start from a controlled hang and avoid excessive swinging."
    },


    {
        id: "inverted-row",
        name: "Inverted Row",
        category: "Pull",
        movement: "Horizontal Pull",

        muscles: [
            "Upper Back",
            "Lats",
            "Biceps",
            "Rear Delts",
            "Core"
        ],

        equipment: "Bar / Table / Rings",
        difficulty: "Beginner",
        skill: "Moderate",

        defaultSets: 3,
        defaultReps: "8–15",
        rest: "60–120 sec",

        progression:
            "Lower body position → elevate feet → add load",

        regression:
            "Higher body position",

        notes:
            "Keep the torso controlled and pull the chest toward the support."
    },


    {
        id: "dead-hang",
        name: "Dead Hang",
        category: "Pull",
        movement: "Grip / Hanging",

        muscles: [
            "Forearms",
            "Grip",
            "Shoulders",
            "Lats"
        ],

        equipment: "Pull-Up Bar",
        difficulty: "Beginner",
        skill: "Low",

        defaultSets: 2,
        defaultReps: "20–60 sec",
        rest: "60–120 sec",

        progression:
            "Increase duration → active hang → weighted hang",

        regression:
            "Feet-assisted hang",

        notes:
            "Build gradually and stop if there is pain or unusual joint symptoms."
    },


    // =========================================
    // LEGS + CORE
    // =========================================

    {
        id: "bodyweight-squat",
        name: "Bodyweight Squat",
        category: "Legs + Core",
        movement: "Squat",

        muscles: [
            "Quadriceps",
            "Glutes",
            "Adductors",
            "Core"
        ],

        equipment: "Bodyweight",
        difficulty: "Beginner",
        skill: "Moderate",

        defaultSets: 3,
        defaultReps: "10–20",
        rest: "60–120 sec",

        progression:
            "Increase reps → tempo → pause → single-leg variation",

        regression:
            "Box squat",

        notes:
            "Use a depth that you can control comfortably."
    },


    {
        id: "reverse-lunge",
        name: "Reverse Lunge",
        category: "Legs + Core",
        movement: "Lunge",

        muscles: [
            "Quadriceps",
            "Glutes",
            "Hamstrings",
            "Calves"
        ],

        equipment: "Bodyweight",
        difficulty: "Beginner",
        skill: "Moderate",

        defaultSets: 3,
        defaultReps: "8–12 / leg",
        rest: "60–120 sec",

        progression:
            "Increase reps → slower tempo → add load",

        regression:
            "Supported reverse lunge",

        notes:
            "Keep the front foot stable and control the descent."
    },


    {
        id: "glute-bridge",
        name: "Glute Bridge",
        category: "Legs + Core",
        movement: "Hip Extension",

        muscles: [
            "Glutes",
            "Hamstrings",
            "Core"
        ],

        equipment: "Bodyweight",
        difficulty: "Beginner",
        skill: "Low",

        defaultSets: 3,
        defaultReps: "10–20",
        rest: "60–90 sec",

        progression:
            "Pause at top → single-leg bridge → add load",

        regression:
            "Shorter range bridge",

        notes:
            "Focus on controlled hip extension rather than excessive lower-back movement."
    },


    {
        id: "calf-raise",
        name: "Standing Calf Raise",
        category: "Legs + Core",
        movement: "Ankle Extension",

        muscles: [
            "Gastrocnemius",
            "Soleus"
        ],

        equipment: "Bodyweight",
        difficulty: "Beginner",
        skill: "Low",

        defaultSets: 3,
        defaultReps: "12–25",
        rest: "45–90 sec",

        progression:
            "Increase reps → single-leg → add load",

        regression:
            "Supported calf raise",

        notes:
            "Use a controlled full range that feels comfortable."
    },


    {
        id: "plank",
        name: "Front Plank",
        category: "Legs + Core",
        movement: "Anti-Extension",

        muscles: [
            "Abdominals",
            "Obliques",
            "Glutes",
            "Shoulders"
        ],

        equipment: "Bodyweight",
        difficulty: "Beginner",
        skill: "Moderate",

        defaultSets: 3,
        defaultReps: "20–60 sec",
        rest: "45–90 sec",

        progression:
            "Increase duration → harder leverage → loaded plank",

        regression:
            "Knee plank",

        notes:
            "Keep the ribs, pelvis and spine controlled."
    },


    // =========================================
    // FLEXIBILITY + MOBILITY
    // =========================================

    {
        id: "deep-squat-hold",
        name: "Deep Squat Hold",
        category: "Flexibility + Mobility",
        movement: "Squat Mobility",

        muscles: [
            "Ankles",
            "Hips",
            "Adductors"
        ],

        equipment: "Bodyweight",
        difficulty: "Beginner",
        skill: "Moderate",

        defaultSets: 2,
        defaultReps: "20–60 sec",
        rest: "30–60 sec",

        progression:
            "Increase comfortable duration → reduce support",

        regression:
            "Supported squat hold",

        notes:
            "Use support if necessary and stay within a comfortable range."
    },


    {
        id: "worlds-greatest-stretch",
        name: "World's Greatest Stretch",
        category: "Flexibility + Mobility",
        movement: "Multi-Joint Mobility",

        muscles: [
            "Hips",
            "Hamstrings",
            "Thoracic Spine",
            "Shoulders"
        ],

        equipment: "Bodyweight",
        difficulty: "Beginner",
        skill: "Moderate",

        defaultSets: 2,
        defaultReps: "4–6 / side",
        rest: "30–60 sec",

        progression:
            "Increase control and range gradually",

        regression:
            "Shortened range version",

        notes:
            "Move slowly rather than forcing the stretch."
    },


    // =========================================
    // STABILITY
    // =========================================

    {
        id: "single-leg-stand",
        name: "Single-Leg Stand",
        category: "Stability",
        movement: "Single-Leg Balance",

        muscles: [
            "Glutes",
            "Calves",
            "Foot Stabilizers",
            "Core"
        ],

        equipment: "Bodyweight",
        difficulty: "Beginner",
        skill: "High",

        defaultSets: 2,
        defaultReps: "20–45 sec / side",
        rest: "30–60 sec",

        progression:
            "Eyes closed → unstable surface → movement challenge",

        regression:
            "Supported single-leg stand",

        notes:
            "Perform near something stable when learning."
    },


    {
        id: "dead-bug",
        name: "Dead Bug",
        category: "Stability",
        movement: "Anti-Extension",

        muscles: [
            "Deep Core",
            "Abdominals",
            "Hip Flexors"
        ],

        equipment: "Bodyweight",
        difficulty: "Beginner",
        skill: "Moderate",

        defaultSets: 3,
        defaultReps: "6–12 / side",
        rest: "45–60 sec",

        progression:
            "Longer lever → slower tempo → resistance",

        regression:
            "Reduced limb movement",

        notes:
            "Keep the trunk controlled while moving the limbs."
    },


    // =========================================
    // ENDURANCE
    // =========================================

    {
        id: "easy-jog",
        name: "Easy Jog",
        category: "Endurance",
        movement: "Locomotion",

        muscles: [
            "Legs",
            "Glutes",
            "Calves",
            "Cardiovascular System"
        ],

        equipment: "None",
        difficulty: "Beginner",
        skill: "Moderate",

        defaultSets: 1,
        defaultReps: "15–30 min",
        rest: "As needed",

        progression:
            "Increase duration gradually → introduce controlled pace changes",

        regression:
            "Brisk walking",

        notes:
            "Keep the effort manageable enough to maintain controlled breathing."
    },


    {
        id: "brisk-walk",
        name: "Brisk Walk",
        category: "Endurance",
        movement: "Locomotion",

        muscles: [
            "Legs",
            "Calves",
            "Glutes",
            "Cardiovascular System"
        ],

        equipment: "None",
        difficulty: "Beginner",
        skill: "Low",

        defaultSets: 1,
        defaultReps: "20–45 min",
        rest: "As needed",

        progression:
            "Increase duration → slightly increase pace",

        regression:
            "Easy walking",

        notes:
            "Useful for lower-impact conditioning and recovery days."
    },


    // =========================================
    // RECOVERY
    // =========================================

    {
        id: "easy-walk",
        name: "Easy Walk",
        category: "Recovery",
        movement: "Low-Intensity Locomotion",

        muscles: [
            "Legs",
            "Calves"
        ],

        equipment: "None",
        difficulty: "Beginner",
        skill: "Low",

        defaultSets: 1,
        defaultReps: "10–30 min",
        rest: "As needed",

        progression:
            "Gradually increase comfortable duration",

        regression:
            "Short easy walk",

        notes:
            "Keep the intensity comfortable and use it as active recovery."
    }

];


// Make the database available to app.js
window.exerciseDatabase = exercises;