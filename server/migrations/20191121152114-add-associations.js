"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    // Post belongsTo User
    return queryInterface.addColumn(
      "Posts", // name of Source model
      "UserId", // name of the key we're adding
      {
        type: Sequelize.INTEGER,
        references: {
          model: "Users", // name of Target model
          key: "id" // key in Target model that we're referencing
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
