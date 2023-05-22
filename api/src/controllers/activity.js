const { Country, Activity, sequelize } = require('../db');

const getCreateActivity = async (data) => {
    try {
        const { name, difficulty, duration, season, countries } = data;
        const activity = await Activity.findOne({
            where: { name }
        });
        let createdActivity = null;
        if (!(activity instanceof Activity)) {
            createdActivity = await Activity.create({
                name,
                difficulty,
                duration,
                season
            });
        }
        let foundCountries = [];
        for (let countryName of countries) {
            const country = await Country.findOne({
                where: { name: countryName }
            });
            foundCountries.push(country);
        }
        if (activity instanceof Activity) {
            await activity.addCountries(foundCountries);
        } else {
            await createdActivity.addCountries(foundCountries);
        }
        return createdActivity;
    } catch (error) {
        throw new Error(error.message);
    }
};

const deleteActivity = async (activityId) => {
    try {
        console.log('Activity ID:', activityId);
        await Country.destroy({ where: { activityId: activityId } });
        await Activity.destroy({ where: { id: activityId } });
        return true;
    } catch (error) {
        throw new Error("Ha ocurrido un error al eliminar la actividad");
    }
};



module.exports = {
    getCreateActivity,
    deleteActivity,
};


module.exports = {
    getCreateActivity,
    deleteActivity,
};