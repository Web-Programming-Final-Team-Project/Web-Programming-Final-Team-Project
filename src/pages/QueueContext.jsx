import React, { createContext, useContext, useState } from "react";

const QueueContext = createContext();

export function QueueProvider({ children }) {
    const [queue, setQueue] = useState([]);

    const addPatient = (ssn) => {
        const newPatient = {
            id: queue.length + 1,
            ssn,
            estimatedTime: (queue.length + 1) * 10,
        };
        setQueue((prevQueue) => [...prevQueue, newPatient]);
        return newPatient.id;
    };

    return (
        <QueueContext.Provider value={{ queue, addPatient }}>
            {children}
        </QueueContext.Provider>
    );
}

export function useQueue() {
    const context = useContext(QueueContext);
    if (!context) {
        throw new Error("useQueue must be used within a QueueProvider");
    }
    return context;
}
