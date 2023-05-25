import fetch from 'node-fetch';
import { MongoClient } from 'mongodb';

async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;

    try {
      const locationQuery = encodeURIComponent(data.location);
      const apiKey = process.env.MAPBOX_ACCESS_TOKEN
      const geocodingUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${locationQuery}.json?access_token=${apiKey}`;

      // Fetch geocoding data from Mapbox Geocoding API
      const response = await fetch(geocodingUrl);
      const geocodingData = await response.json();

      if (geocodingData.features.length > 0) {
        const coordinates = geocodingData.features[0].geometry.coordinates;

        // Save the data to MongoDB
        const client = await MongoClient.connect(process.env.MONGODB_CLIENT);
        const db = client.db();
        const housesCollection = db.collection('houses');
        const result = await housesCollection.insertOne({
          ...data,
          coordinates,
        });
        console.log(result);
        client.close();

        res.status(201).json({ message: 'Meetup Inserted!' });
      } else {
        res.status(404).json({ error: 'Location not found' });
      }
    } catch (error) {
      console.error('Error:', error.message);
      res.status(500).json({ error: 'Something went wrong' });
    }
  }
}

export default handler;

