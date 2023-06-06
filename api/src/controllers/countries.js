const axios = require('axios');
const { Country, Activity } = require('../db');
const { Op } = require('sequelize');

const getAllCountries = async (req, res) => {
  try {
   
    const { name } = req.query;

  
    const countryCount = await Country.count();

    if (!countryCount) {
     
      const response = await axios.get('https://restcountries.com/v3/all');
      const apiCountries = response.data;

    
      const countries = apiCountries.map((pais) => ({
        id: pais.cca3,
        name: pais.name.common,
        flags: pais.flags[1],
        continents: pais.continents[0],
        capital: pais.capital,
        subregion: pais.subregion || 'Sin Datos',
        area: pais.area || 'Sin Datos',
        population: pais.population,
        maps: pais.maps?.googleMaps || null,
      }));

  
      await Country.bulkCreate(countries);
    }

    if (name) {
    
      const countryName = await Country.findAll({
        where: {
          name: { [Op.iLike]: `%${name}%` },
        },
      });

      if (countryName.length) {
        res.status(200).json(countryName);
      } else {
        res.status(404).json({ message: `No countries were found with the name: ${name}` });
      }
    } else {
    
      const allCountries = await Country.findAll();
      res.status(200).json(allCountries);
    }
  } catch (error) {
    console.error('Error getting countries:', error);
    res.status(500).json({ error: 'Error getting countries' });
  }
};

const getCountriesId = async (req, res) => {
    const { id } = req.params;
    try {
     
      const country = await Country.findByPk(id.toUpperCase(), {
        include: {
          model: Activity,
          through: { attributes: [] },
        },
      });
  
     
      if (country) {
    
        res.status(200).json(country);
      } else {
    
        res.status(404).json({ error: { message: 'Country not found', values: { id } } });
      }
    } catch (error) {
      console.error('Error getting country by ID:', error);
      
      res.status(500).json({ error: 'Error getting country by ID' });
    }
  };
  

module.exports = {
  getAllCountries,
  getCountriesId,
};
