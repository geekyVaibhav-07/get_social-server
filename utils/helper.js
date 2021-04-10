const removeUndefindes = (object = {}) => {
    const result = { ...object };
    Object.keys(result).forEach(key => {
        if (!result[key]) {
            delete result[key];
        }
    })
    return result;
}

const filterSensitiveData = (dataSet = [], filterSet = []) => {
    if (dataSet.length !== filterSet.length) {
        return false
    }
    for (let i = 0; i < dataSet.length; i++) {
        const data = dataSet[i];
        const filter = filterSet[i];
        for (const k in filter) {
            if (filter[k]) {
                delete data[k];
            }
        }
    }

    return dataSet;
}

module.exports = {
    removeUndefindes,
    filterSensitiveData
}