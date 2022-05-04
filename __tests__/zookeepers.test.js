const fs = require('fs');

const { 
    filterByQuery,
    findById,
    createNewZookeeper,
    validateZookeeper
} = require('../lib/zookeepers.js');

const {zookeepers} = require('../data/zookeepers');

jest.mock('fs');

test("create an zookeeper object", () => {
    const zookeeper = createNewZookeeper({name: "Darlene", id: "jhgdja3ng2"}, zookeepers);
   
    expect(zookeeper.name).toBe("Darlene");
    expect(zookeeper.id).toBe("jhgdja3ng2");

});

test("filters aby query", () => {
    const startingZookeepers = [
        {
            id: '3',
            name: 'Erica',
            favoriteAnimal: 'gorilla',
            age:   '28'
        },
        {
            id: '4',
            name: 'Noel',
            favoriteAnimal: 'bear',
            age:   '32'
        },
    ];

    const updateZookeepers = filterByQuery({favoriteAnimal: "gorilla"}, startingZookeepers);

    expect(updateZookeepers.length).toEqual(1);
});

test('finds by id', () => {
    const startingZookeepers = [
        {
            id: '3',
            name: 'Erica',
            favoriteAnimal: 'gorilla',
            age:   '28'
        },
        {
            id: '4',
            name: 'Noel',
            favoriteAnimal: 'bear',
            age:   '32'
        },
    ];

    const result = findById('3', startingZookeepers);

    expect(result.name).toBe("Erica");

});

test('validates age', () => {
    const zookeeper = {
            id: '3',
            name: 'Erica',
            favoriteAnimal: 'gorilla',
            age:   28
        };

    const invalidZookeeper = {
            id: '4',
            name: 'Noel',
            favoriteAnimal: 'dolphin',
            age:   '32'
        };

      const result = validateZookeeper(zookeeper);
      const result2 = validateZookeeper(invalidZookeeper);

      expect(result).toBe(true);
      expect(result2).toBe(false);
});
