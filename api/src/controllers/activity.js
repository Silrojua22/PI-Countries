const { Country, Activity, sequelize } = require('../db');

const getCreateActivity = async (data) => {
    try {
        const { name, difficulty, duration, season, countries } = data;

        // Verificar si los valores necesarios están presentes en "data"
        if (!name || !difficulty || !duration || !season || !countries) {
            throw new Error('Missing required data');
        }

        const activity = await Activity.findOne({
            where: { name }
        });

        let createdActivity = null;

        if (!activity) {
            createdActivity = await Activity.create({
                name,
                difficulty,
                duration,
                season
            });
        }

        let foundCountries = await Country.findAll({
            where: { name: countries }
        });

        if (activity) {
            await activity.addCountries(foundCountries);
        } else {
            await createdActivity.addCountries(foundCountries);
        }

        return createdActivity;
    } catch (error) {
        throw Error(error.message);
    }
};

module.exports = {
    getCreateActivity,
};
