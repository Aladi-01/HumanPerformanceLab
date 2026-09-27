// ==========================================
// HUMAN PERFORMANCE LAB
// LOCAL DATABASE / STORAGE LAYER
// ==========================================

const HPL_STORAGE_KEY = "hpl_sessions";


// ---------- GET ALL SESSIONS ----------

function getStoredSessions() {

    try {

        const data =
            localStorage.getItem(HPL_STORAGE_KEY);

        if (!data) {
            return [];
        }

        return JSON.parse(data);

    } catch (error) {

        console.error(
            "Could not read stored sessions:",
            error
        );

        return [];
    }
}


// ---------- SAVE ALL SESSIONS ----------

function saveStoredSessions(sessions) {

    try {

        localStorage.setItem(
            HPL_STORAGE_KEY,
            JSON.stringify(sessions)
        );

        return true;

    } catch (error) {

        console.error(
            "Could not save sessions:",
            error
        );

        return false;
    }
}


// ---------- SAVE ONE SESSION ----------

function saveSession(session) {

    const sessions =
        getStoredSessions();

    sessions.push(session);

    return saveStoredSessions(sessions);
}


// ---------- DELETE SESSION ----------

function deleteSession(sessionId) {

    const sessions =
        getStoredSessions();

    const updatedSessions =
        sessions.filter(
            session =>
                session.id !== sessionId
        );

    return saveStoredSessions(
        updatedSessions
    );
}


// ---------- CLEAR DATABASE ----------

function clearAllSessions() {

    localStorage.removeItem(
        HPL_STORAGE_KEY
    );
}


// ---------- DATABASE INFORMATION ----------

function getDatabaseInfo() {

    const sessions =
        getStoredSessions();

    return {

        sessionCount:
            sessions.length,

        storageKey:
            HPL_STORAGE_KEY,

        storageType:
            "Browser Local Storage",

        offline:
            true

    };
}