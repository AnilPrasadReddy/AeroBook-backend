'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Airport extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.City,{
        foreignKey:'cityId',
        onDelete:'CASCADE',
      })
      this.hasMany(models.Flight,{
        foreignKey:'departureAirportId',
        onDelete:'CASCADE',
      })
      this.hasMany(models.Flight,{
        foreignKey:'arrivalAirportID',
        onDelete:'CASCADE',
      })
    }
  }
  Airport.init({
    airport_name: {
      type:DataTypes.STRING,
      allowNull:false,
      unique:true,
    },
    code: {
      type:DataTypes.STRING,
      allowNull:false,
      unique:true,
    },
    address: DataTypes.STRING,
    cityId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Airport',
  });
  return Airport;
};