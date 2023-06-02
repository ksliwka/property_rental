// import HouseList from "../components/houses/HouseList";
// import { Container } from "react-bootstrap";
// import { MongoClient } from "mongodb";
// import { Fragment } from "react";
// import Head from "next/head";
// import Slogan from "../components/layout/Slogan";

// // const DUMMY_HOUSES = [
// //   {
// //     id: 1,
// //     title: "Modern Studio in the Heart of the City",
// //     image: "https://source.unsplash.com/random/800x600/?apartment",
// //     location: "Downtown",
// //     rentalAvailability: "May 15th - June 15th",
// //     price: "$1200/month",
// //     description:
// //       "This stylish studio apartment is located in the heart of the city, with easy access to all the best shops, restaurants, and attractions. It features a modern design and high-end amenities, including a fully-equipped kitchen, comfortable bed, and spacious living area.",
// //   },
// //   {
// //     id: 2,
// //     title: "Charming 1-Bedroom Apartment in Historic Building",
// //     image: "https://source.unsplash.com/random/800x600/?flat",
// //     location: "Old Town",
// //     rentalAvailability: "June 1st - August 31st",
// //     price: "$1500/month",
// //     description:
// //       "This cozy apartment is located in a beautiful historic building in the heart of Old Town. It features a charming vintage design with hardwood floors, exposed brick walls, and high ceilings. The apartment is fully furnished and equipped with all the amenities you need for a comfortable stay.",
// //   },
// //   {
// //     id: 3,
// //     title: "Spacious 2-Bedroom Apartment with Stunning Views",
// //     image: "https://source.unsplash.com/random/800x600/?apartment-building",
// //     location: "Midtown",
// //     rentalAvailability: "July 1st - September 30th",
// //     price: "$2000/month",
// //     description:
// //       "This beautiful apartment features two spacious bedrooms and breathtaking views of the city skyline. It is located in a modern high-rise building in the trendy Midtown neighborhood, with easy access to all the best shopping, dining, and entertainment options.",
// //   },
// //   {
// //     id: 4,
// //     title: "Luxurious Penthouse with Private Rooftop Terrace",
// //     image: "https://source.unsplash.com/random/800x600/?penthouse",
// //     location: "Upper East Side",
// //     rentalAvailability: "August 1st - December 31st",
// //     price: "$5000/month",
// //     description:
// //       "This stunning penthouse apartment is the epitome of luxury living in New York City. It features a private rooftop terrace with panoramic views of the city, as well as high-end amenities like a gourmet kitchen, spa-like bathrooms, and a state-of-the-art home theater system.",
// //   },
// //   {
// //     id: 5,
// //     title: "Cozy Studio in a Quiet Residential Neighborhood",
// //     image: "https://source.unsplash.com/random/800x600/?studio",
// //     location: "Brooklyn",
// //     rentalAvailability: "June 15th - October 15th",
// //     price: "$900/month",
// //     description:
// //       "This cozy studio apartment is located in a quiet residential neighborhood in Brooklyn. It features a simple but functional design with all the basic amenities you need for a comfortable stay. The apartment is within walking distance of several parks, cafes, and grocery stores.",
// //   },
// // ];

// function HomePage(props) {
//   return (
//     <Fragment>
//       <Head>
//         <title>Housy</title>
//         <meta name="description" content="" />
//       </Head>
//       <Container>
//         <Slogan />
        
//         <HouseList houses={props.houses} />
//       </Container>
//     </Fragment>
//   );
// }

// export async function getStaticProps() {
//   const client = await MongoClient.connect(process.env.MONGODB_CLIENT);
//   const db = client.db();
//   const housesCollection = db.collection("houses");
//   const houses = await housesCollection.find().toArray();

//   client.close();

//   return {
//     props: {
//       houses: houses.map((house) => ({
//         title: house.title,
//         image: house.image,
//         location: house.location,
//         description: house.description,
//         price: house.price,
//         id: house._id.toString(),
//       })),
//     },
//     revalidate: 10,
//   };
// }

// export default HomePage;


import HouseList from "../components/houses/HouseList";
import { Container } from "react-bootstrap";
import { MongoClient } from "mongodb";
import { Fragment, useState } from "react";
import Head from "next/head";
import Slogan from "../components/layout/Slogan";
import FilterInput from "../components/filter/FilterInput";

// const DUMMY_HOUSES = [
//   {
//     id: 1,
//     title: "Modern Studio in the Heart of the City",
//     image: "https://source.unsplash.com/random/800x600/?apartment",
//     location: "Downtown",
//     rentalAvailability: "May 15th - June 15th",
//     price: "$1200/month",
//     description:
//       "This stylish studio apartment is located in the heart of the city, with easy access to all the best shops, restaurants, and attractions. It features a modern design and high-end amenities, including a fully-equipped kitchen, comfortable bed, and spacious living area.",
//   },
//   {
//     id: 2,
//     title: "Charming 1-Bedroom Apartment in Historic Building",
//     image: "https://source.unsplash.com/random/800x600/?flat",
//     location: "Old Town",
//     rentalAvailability: "June 1st - August 31st",
//     price: "$1500/month",
//     description:
//       "This cozy apartment is located in a beautiful historic building in the heart of Old Town. It features a charming vintage design with hardwood floors, exposed brick walls, and high ceilings. The apartment is fully furnished and equipped with all the amenities you need for a comfortable stay.",
//   },
//   {
//     id: 3,
//     title: "Spacious 2-Bedroom Apartment with Stunning Views",
//     image: "https://source.unsplash.com/random/800x600/?apartment-building",
//     location: "Midtown",
//     rentalAvailability: "July 1st - September 30th",
//     price: "$2000/month",
//     description:
//       "This beautiful apartment features two spacious bedrooms and breathtaking views of the city skyline. It is located in a modern high-rise building in the trendy Midtown neighborhood, with easy access to all the best shopping, dining, and entertainment options.",
//   },
//   {
//     id: 4,
//     title: "Luxurious Penthouse with Private Rooftop Terrace",
//     image: "https://source.unsplash.com/random/800x600/?penthouse",
//     location: "Upper East Side",
//     rentalAvailability: "August 1st - December 31st",
//     price: "$5000/month",
//     description:
//       "This stunning penthouse apartment is the epitome of luxury living in New York City. It features a private rooftop terrace with panoramic views of the city, as well as high-end amenities like a gourmet kitchen, spa-like bathrooms, and a state-of-the-art home theater system.",
//   },
//   {
//     id: 5,
//     title: "Cozy Studio in a Quiet Residential Neighborhood",
//     image: "https://source.unsplash.com/random/800x600/?studio",
//     location: "Brooklyn",
//     rentalAvailability: "June 15th - October 15th",
//     price: "$900/month",
//     description:
//       "This cozy studio apartment is located in a quiet residential neighborhood in Brooklyn. It features a simple but functional design with all the basic amenities you need for a comfortable stay. The apartment is within walking distance of several parks, cafes, and grocery stores.",
//   },
// ];

function HomePage(props) {
  const [filteredHouses, setFilteredHouses] = useState(props.houses);

  const handleSearch = (filters) => {
    const filteredData = props.houses.filter((house) => {
      if (filters.location.toLowerCase() === house.location.toLowerCase() ) {
        console.log(filters.rentalAvailability)
        return true
      }
      return false;

      // Perform filtering logic based on filter values
      // Example:
      // if (filters.location && house.location !== filters.location) {
      //   return false;
      // }
      // if (filters.numOfPeople && house.numOfPeople !== filters.numOfPeople) {
      //   return false;
      // }
      // if (filters.date && house.date !== filters.date) {
      //   return false;
      // }
      // return true;


      // const isLocationMatch =
      //   filters.location === "" ||
      //   house.location.toLowerCase();
      // const isNumOfPeopleMatch =
      //   filters.numOfPeople === "" || house.numOfPeople >= parseInt(numOfPeople, 10);
      // const isDateMatch =
      //   filters.rentalAvailability === 0 ||
      //   (house.rentalAvailability.start <= filters.formattedStartDate &&
      //     house.rentalAvailability.end >= filters.formattedEndDate);

      // // Return true if at least one of the inputs is true
      // return isLocationMatch || isNumOfPeopleMatch || isDateMatch;
    });

    setFilteredHouses(filteredData);
  };
  return (
    <Fragment>
      <Head>
        <title>Housy</title>
        <meta name="description" content="" />
      </Head>
      <Container>
        <Slogan />
        <FilterInput onSearch={handleSearch} />
        <HouseList houses={filteredHouses} />
      </Container>
    </Fragment>
  );
}

export async function getStaticProps() {
  const client = await MongoClient.connect(process.env.MONGODB_CLIENT);
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
        rentalAvailability: house.rentalAvailability,
        id: house._id.toString(),
      })),
    },
    revalidate: 10,
  };
}

export default HomePage;

