const { Activity } = require('../db');

async function deleteActivity(activityId) {
  const deletedActivityCount = await Activity.destroy({
    where: { id: activityId },
  });

  return deletedActivityCount > 0; // Retorna true si se eliminó al menos una actividad, false de lo contrario
}

module.exports = {
  deleteActivity,
};
