const currentYear = new Date(Date.now()).getFullYear();

const yearList = [];

for (let year = currentYear - 10; year <= currentYear; ++year) {
    yearList.unshift({
        key: year,
        value: year,
    });
}

export {
    yearList,
    currentYear
};