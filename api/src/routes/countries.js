/* const {getDbInfo} = require('./db/dbsave') */
const {getAllCountries, getCountriesId} = require('../controllers/countries')
const {Router} = require('express');

const router = Router();


router.get('/', getAllCountries);
router.get('/:id', getCountriesId );


module.exports = router;
