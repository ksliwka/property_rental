// import { Fragment } from "react";
// import { MongoClient } from "mongodb";
// import Map from "../../components/houses/Map";

// function Locations({houses}) {

//   return (
//     <Fragment>
//       <Map houses={houses} />
//     </Fragment>
//   );
// }


// // export async function getStaticProps() {
// //   const client = await MongoClient.connect(
// //     "mongodb+srv://kateplum99:m6YfDUqDAlEbwSU3@cluster0.yh8wym1.mongodb.net/?retryWrites=true&w=majority"
// //   );
// //   const db = client.db();
// //   const housesCollection = db.collection("houses");
// //   const houses = await housesCollection.find().toArray();

// //   const housesWithCoordinates = houses.map((house) => {
// //     const coordinates = house.coordinates;

// //     return {
// //       id: house._id.toString(),
// //       image: house.image,
// //       title: house.title,
// //       location: house.location,
// //       price: house.price,
// //       coordinates: {
// //         latitude: coordinates[1],
// //         longitude: coordinates[0],
// //       },
// //     };
// //   });

// //   client.close();

// //   return {
// //     props: {
// //       houses: housesWithCoordinates,
// //     },
// //     revalidate: 10,
// //   };
// // }


// export async function getStaticProps() {
//   const client = await MongoClient.connect(
//     "mongodb+srv://kateplum99:m6YfDUqDAlEbwSU3@cluster0.yh8wym1.mongodb.net/?retryWrites=true&w=majority"
//   );
//   const db = client.db();
//   const housesCollection = db.collection("houses");
//   const houses = await housesCollection.find().toArray();

//   const housesWithCoordinates = houses.map((house) => ({
//     id: house._id.toString(),
//     image: house.image,
//     title: house.title,
//     location: house.location,
//     price: house.price,
//     coordinates: {
//       latitude: house.coordinates[1],
//       longitude: house.coordinates[0],
//     },
//   }));

//   client.close();

//   return {
//     props: {
//       houses: housesWithCoordinates,
//     },
//     revalidate: 10,
//   };
// }

// export default Locations;
// import { Fragment } from "react";
// import { MongoClient } from "mongodb";
// import Map from "../../components/houses/Map";

// function Locations({ houses }) {
//   return (
//     <Fragment>
//       {houses && houses.length > 0 ? (
//         <Map houses={houses} />
//       ) : (
//         <p>No houses available</p>
//       )}
//     </Fragment>
//   );
// }

// export async function getStaticProps() {
//   const client = await MongoClient.connect(
//     "mongodb+srv://kateplum99:m6YfDUqDAlEbwSU3@cluster0.yh8wym1.mongodb.net/?retryWrites=true&w=majority"
//   );
//   const db = client.db();
//   const housesCollection = db.collection("houses");
//   const houses = await housesCollection.find().toArray();

//   const housesWithCoordinates = houses.map((house) => ({
//     id: house._id.toString(),
//     image: house.image,
//     title: house.title,
//     location: house.location,
//     price: house.price,
//     coordinates: {
//       latitude: house.coordinates[1],
//       longitude: house.coordinates[0],
//     },
//   }));

//   client.close();

//   return {
//     props: {
//       houses: housesWithCoordinates,
//     },
//     revalidate: 10,
//   };
// }

// export default Locations;



// import { Fragment } from "react";
// import { MongoClient } from "mongodb";
// import Map from "../../components/houses/Map";

// function Locations({ houses }) {
//   return (
//     <Fragment>
//       {houses && houses.length > 0 ? (
//         <Map houses={houses} />
//       ) : (
//         <p>No houses available</p>
//       )}
//     </Fragment>
//   );
// }

// export async function getStaticProps() {
//   const client = await MongoClient.connect(
//     "mongodb+srv://kateplum99:m6YfDUqDAlEbwSU3@cluster0.yh8wym1.mongodb.net/?retryWrites=true&w=majority"
//   );
//   const db = client.db();
//   const housesCollection = db.collection("houses");
//   const houses = await housesCollection.find().toArray();

//   const housesWithCoordinates = houses.map((house) => {
//     const latitude = house.coordinates[0].$numberDouble; // Extract the latitude from the coordinates array
//     const longitude = house.coordinates[1].$numberDouble; // Extract the longitude from the coordinates array

//     return {
//       id: house._id.toString(),
//       image: house.image,
//       title: house.title,
//       location: house.location,
//       price: house.price,
//       coordinates: {
//         latitude,
//         longitude,
//       },
//     };
//   });

//   client.close();

//   return {
//     props: {
//       houses: housesWithCoordinates,
//     },
//     revalidate: 10,
//   };
// }



// export default Locations;


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