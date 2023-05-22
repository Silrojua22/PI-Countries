const { Router } = require('express');
const { Activity, Country } = require('../db');
const { getCreateActivity } = require("../controllers/activity")
const {deleteActivity } = require("../controllers/utilsActivity")

const router = Router();

router.get('/', async (req, res) => {
    try {
        // Buscar todas las actividades en la base de datos
        const allActivities = await Activity.findAll({
            include: Country
        })
        // Devolvemos las acitividades encontradas como respuesta
        res.status(200).json(allActivities)
    } catch (error) {
        res.status(400).json({ error: "No se encontraron actividades" })
    }

});


router.post("/", async (req, res, next) => {
    try {
        // Crear una nueva actividad utilizando los datos recibidos en el cuerpo de la solicitud
        const response = await getCreateActivity(req.body);
        res.status(201).json({
            status: 'Se ha creado exitosamente'
        })

    } catch (error) {

        res.status(400).json({ error: error.message })
        next(error)
    }
})

// router.delete("/:id", async (req, res, next) => {
//     try {
//         const  activityId  = req.params.id;
//         //eliminar la actividad desde la base de datos
//         const deleted = await deleteActivity(activityId);
//         if (deleted) {
//             res.status(200).json({ message: "La actividad ah sido eliminada con exito" })
//         } else {
//             res.status(404).json({ error: 'La actividad no existe' });
//         }
//     } catch (error) {
//         res.status(500).json({ error: "Ha ocurrido un error al eliminar la actividad" })
//     }
// })
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