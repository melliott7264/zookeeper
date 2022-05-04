const fs = require('fs');
const path = require('path');

function filterByQuery(query, zookeepers) {
    let filteredResults = zookeepers;

    if (query.name) {
        filteredResults = filteredResults.filter(
            (zookeeper) => zookeeper.name === query.name
        );
    }

    if (query.age) {
        filteredResults = filteredResults.filter(
            // must convert string to number for comparison
            (zookeeper) => zookeeper.age === Number(query.age)
        );
    }

    if (query.favoriteAnimal) {
        filteredResults = filteredResults.filter(
            (zookeeper) => zookeeper.favoriteAnimal === query.favoriteAnimal
        );
    }
    return filteredResults;
}

function findById(id, zookeepers) {
    const result = zookeepers.filter((zookeeper) => zookeeper.id === id)[0];
    return result;
}

function createNewZookeeper(body, zookeepers) {
    const zookeeper = body;

    zookeepers.push(zookeeper);

    fs.writeFileSync(
        path.join(__dirname, "../data/zookeepers.json"),
        // Why do we need the curly braces here?
        JSON.stringify({zookeepers}, null, 2)
    );
    return zookeeper;
}

function validateZookeeper(zookeeper) {
    if (!zookeeper.name || typeof zookeeper.name !== "string") {
        return false;
    }

    if (!zookeeper.age || typeof zookeeper.age !== "number") {
        return false;
    }

    if (!zookeeper.favoriteAnimal || typeof zookeeper.favoriteAnimal !== "string") {
        return false;
    }

    return true;
}

module.exports = {
    filterByQuery,
    findById,
    createNewZookeeper,
    validateZookeeper
};