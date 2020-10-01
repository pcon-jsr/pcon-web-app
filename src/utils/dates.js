export const getLocalDateFromFirebaseTimestamp = (timestamp) => {
    const localDate = new Date(timestamp.toDate().toISOString()).toLocaleString("en-IN", {
        hour12: true,
        month: "short",
        day: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        weekday: "short",
    });
    return localDate;
}