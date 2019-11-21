"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    const userSeeds = [];
    const postSeeds = [];

    for (let i = 1; i <= 5; i++) {
      userSeeds.push({
        firstName: `firstName_${i}`,
        lastName: `lastName_${i}`,
        email: `user_${i}@example.com`,
        createdAt: new Date(),
        updatedAt: new Date()
      });

      for (let j = 1; j <= 3; j++) {
        postSeeds.push({
          title: `title ${j}`,
          content: `content ${j}`,
          createdAt: new Date(),
          updatedAt: new Date(),
          UserId: i
        });
      }
    }

    return queryInterface.bulkInsert("Users", userSeeds, {}).then(() => {
      return queryInterface.bulkInsert("Posts", postSeeds, {});
    });
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
