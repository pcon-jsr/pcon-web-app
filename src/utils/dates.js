export const getLocalDateFromFirebaseTimestamp = (timestamp) => {
    const localDate = new Date(timestamp.toDate().toISOString()).toLocaleString();
    return localDate;
}