const axios = require('axios');
const { Country, Activity } = require('../db');
const { Op } = require('sequelize');
//quiero modificar
const getAllCountries = async (req, res) => {
  try {
    // Obtener el parámetro 'name' de la consulta (query)
    const { name } = req.query;

    // Contar la cantidad de países en la base de datos
    const countryCount = await Country.count();

    if (!countryCount) {
      // Si no hay países en la base de datos, obtener los países de la API externa
      const response = await axios.get('https://restcountries.com/v3/all');
      const apiCountries = response.data;

      // Mapear los datos de los países obtenidos de la API a un formato deseado
      const countries = apiCountries.map((pais) => ({
        id: pais.cca3,
        name: pais.name.common,
        flags: pais.flags[1],
        continents: pais.continents[0],
        capital: pais.capital || 'Sin Datos',
        subregion: pais.subregion,
        area: pais.area,
        population: pais.population,
        maps: pais.maps?.googleMaps || null,
      }));

      // Insertar los países obtenidos de la API en la base de datos
      await Country.bulkCreate(countries);
    }

    if (name) {
      // Si se proporciona el parámetro 'name', buscar países por nombre en la base de datos
      const countryName = await Country.findAll({
        where: {
          name: { [Op.iLike]: `%${name}%` },
        },
      });

      if (countryName.length) {
        res.status(200).json(countryName);
      } else {
        res.status(404).json({ message: `No se encontraron países con el nombre: ${name}` });
      }
    } else {
      // Si no se proporciona el parámetro 'name', obtener todos los países de la base de datos
      const allCountries = await Country.findAll();
      res.status(200).json(allCountries);
    }
  } catch (error) {
    console.error('Error al obtener los países:', error);
    res.status(500).json({ error: 'Error al obtener los países' });
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
      res.status(404).json({ error: { message: 'El país no se encontró', values: { id } } });
    }
  } catch (error) {
    console.error('Error al obtener el país por ID:', error);
    res.status(500).json({ error: 'Error al obtener el país por ID' });
  }
};

module.exports = {
  getAllCountries,
  getCountriesId,
};
