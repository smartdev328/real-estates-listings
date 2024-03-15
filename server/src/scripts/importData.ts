import fs from 'fs';

import csv from 'csv-parser';
import { getConnection } from 'typeorm';

import { dbConnection } from '../database';
import { Listing } from '../entities/listing.entity';
import { logger } from '../utils/winston';

const importDataFromCSV = async () => {
  try {
    await dbConnection();
    const connection = await getConnection(); // Ensure your TypeORM connection is already established
    if (!connection.isConnected) {
      throw new Error('DB connection failed');
    }
    const results = [];
    fs.createReadStream('./data.csv')
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', async () => {
        results.unshift();
        for (const result of results) {
          const data = {
            brokertitle: result['BROKERTITLE'],
            type: result['TYPE'],
            price: parseFloat(result['PRICE']),
            beds: parseInt(result['BEDS']),
            bath: parseInt(result['BATH']),
            propertysqft: parseFloat(result['PROPERTYSQFT']),
            address: result['ADDRESS'],
            state: result['STATE'],
            main_address: result['MAIN_ADDRESS'],
            administrative_area_level_2: result['ADMINISTRATIVE_AREA_LEVEL_2'],
            locality: result['LOCALITY'],
            sublocality: result['SUBLOCALITY'],
            street_name: result['STREET_NAME'],
            long_name: result['LONG_NAME'],
            formatted_address: result['FORMATTED_ADDRESS'],
            latitude: parseFloat(result['LATITUDE']),
            longitude: parseFloat(result['LONGITUDE']),
          };
          await connection.manager.save(connection.manager.create(Listing, data));
        }
        console.log('Data imported successfully');
        process.exit();
      });
  } catch (err) {
    logger.error(err.message);
  }
};

importDataFromCSV();
