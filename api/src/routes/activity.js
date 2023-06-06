const { Router } = require('express');
const { Activity, Country } = require('../db');
const { getCreateActivity } = require("../controllers/activity")
const { deleteActivity } = require("../controllers/deleteActivity")

const router = Router();
//Buscar y devolver todas las actividades creadas 
router.get('/', async (req, res) => {
  try {
    
    const allActivities = await Activity.findAll({
      include: Country
    })
    
    res.status(200).json(allActivities)
  } catch (error) {
    res.status(400).json({ error: "No se encontraron actividades" })
  }

});

// Crear una nueva actividad utilizando los datos recibidos en el cuerpo de la solicitud
router.post("/", async (req, res, next) => {
  try {
    
    const response = await getCreateActivity(req.body);
    res.status(201).json({
      status: 'Se ha creado exitosamente'
    })

  } catch (error) {

    res.status(400).json({ error: error.message })
    next(error)
  }
})

//Eliminar actividad por su id
router.delete("/:id", async (req, res, next) => {
  try {
    const activityId = req.params.id;
    const deleted = await deleteActivity(activityId);

    if (deleted) {
      res.status(200).json({ message: "La actividad ha sido eliminada con éxito" });
    } else {
      res.status(404).json({ error: 'La actividad no existe' });
    }
  } catch (error) {
    res.status(500).json({ error: "Ha ocurrido un error al eliminar la actividad" });
  }
});



module.exports = router;