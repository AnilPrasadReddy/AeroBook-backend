const { StatusCodes } = require('http-status-codes');
const  {AirportRepository} = require('../repositories');
const { AppError } = require('../utils/error/app-error');

const airportRepository = new AirportRepository();


async function createAirport(data) {
    try {
        const airport = await airportRepository.create(data);
        return airport;
    } catch (error) {
        if(error.name == 'SequelizeValidationError'){
            let explaination=[];
            error.error.forEach((err)=>{
                explaination.push(err.message);
            })
            throw new AppError(explaination,StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create Airport',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAirports() {
    try {
        const airports = await airportRepository.getAll();
        return airports;
    } catch (error) {
        throw new AppError('Cannot fetch Airports',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAirport(id){
    try {
        const airport = await airportRepository.get(id);
        return airport;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError('No Airport found',StatusCodes.NOT_FOUND);
        }
        throw new AppError('Cannot fetch Airport',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function updateAirport(id,data){
    try {
        const response = await airportRepository.update(id,data);
        return response;
    } catch (error) {
        throw new AppError('Cannot update Airport',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function deleteAirport(id){
    try {
        const response = await airportRepository.destroy(id);
        return response;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError('No Airport found',StatusCodes.NOT_FOUND);
        }
        throw new AppError('Cannot delete Airport',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    createAirport,
    getAirports,
    getAirport,
    updateAirport,
    deleteAirport
}
