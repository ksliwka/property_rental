import HouseDetail from "../../components/houses/HouseDetail";
import { MongoClient, ObjectId } from "mongodb";

function HouseDetails(props) {
  return (
    <HouseDetail
      image={props.houseData.image}
      location={props.houseData.location}
      title={props.houseData.title}
      price={props.houseData.price}
      rentalAvailability={props.houseData.rentalAvailability}
      description={props.houseData.description}
    />
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://kateplum99:m6YfDUqDAlEbwSU3@cluster0.yh8wym1.mongodb.net/?retryWrites=true&w=majority"
  );
  const db = client.db();
  const housesCollection = db.collection("houses");
  const houses = await housesCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: false,
    paths: houses.map((house) => ({
      params: { houseId: house._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  const houseId = context.params.houseId;

  const client = await MongoClient.connect(
    "mongodb+srv://kateplum99:m6YfDUqDAlEbwSU3@cluster0.yh8wym1.mongodb.net/?retryWrites=true&w=majority"
  );
  const db = client.db();
  const housesCollection = db.collection("houses");
  const selectedHouse = await housesCollection.findOne({
    _id: new ObjectId(houseId),
  });

  client.close();

  return {
    props: {
      houseData: {
        id: selectedHouse._id.toString(),
        title: selectedHouse.title,
        image: selectedHouse.image,
        location: selectedHouse.location,
        price: selectedHouse.price,
        rentalAvailability: selectedHouse.rentalAvailability,
        description: selectedHouse.description,
      },
    },
  };
}

export default HouseDetails;
