'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('AvtoParts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      car_brand: {
        type: Sequelize.STRING
      },
      parts_name: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.INTEGER
      },
      vendor_code: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING(2048)
      },
      images: {
        type: Sequelize.STRING(2048)
      },
      in_stock: {
        type: Sequelize.INTEGER
      },
      bestsellers: {
        type: Sequelize.BOOLEAN
      },
      new: {
        type: Sequelize.BOOLEAN
      },
      popularity: {
        type: Sequelize.INTEGER
      },
      compatibility: {
        type: Sequelize.STRING(2048)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable('AvtoParts');
  }
};