import { Fragment } from "react";
import { MongoClient } from "mongodb";
import Map from "../../components/houses/Map";

function Locations(props) {

  return (
    <Fragment>
      <Map houses={props.houses} />
    </Fragment>
  );
}

 

export async function getStaticProps() {
  const client = await MongoClient.connect(
    process.env.MONGODB_CLIENT
  );
  const db = client.db();
  const housesCollection = db.collection("houses");
  const houses = await housesCollection.find().toArray();

  client.close();

  return {
    props: {
      houses: houses.map((house) => ({
        title: house.title,
        image: house.image,
        location: house.location,
        description: house.description,
        price: house.price,
        id: house._id.toString(),
        coordinates: {
          latitude: house.coordinates[0],
          longitude: house.coordinates[1],
        },
      })),
    },
    revalidate: 10,
  };
}

export default Locations