import HouseList from "../components/houses/HouseList";
import { Container } from "react-bootstrap";
import { MongoClient } from "mongodb";
import { Fragment, useState } from "react";
import Head from "next/head";
import Slogan from "../components/layout/Slogan";
import FilterInput from "../components/filter/FilterInput";

function HomePage(props) {
  const [filteredHouses, setFilteredHouses] = useState(props.houses);

  const handleSearch = (filters, formattedStartDate, formattedEndDate) => {
    console.log("handleSearch function called");
    const filteredData = props.houses.filter((house) => {

      const isLocationMatch =
        filters.location === "" ||
        house.location.toLowerCase() === filters.location.toLowerCase();
      const isNumOfPeopleMatch =
        filters.numOfPeople === "" ||
        parseInt(house.noPeople) >= parseInt(filters.numOfPeople);
        console.log("House rentalAvailability start:", house.rentalAvailability.start);
        console.log(house.rentalAvailability.start)
        const isDateMatch =
        formattedStartDate === undefined ||
        formattedEndDate === undefined ||
        (house.rentalAvailability.start <= formattedStartDate &&
          house.rentalAvailability.end >= formattedEndDate);
          console.log('formatted start dates')
          console.log(formattedStartDate)
      
            console.log(
              "House:",
              house.title,
              "Location Match:",
              isLocationMatch,
              "Num of People Match:",
              isNumOfPeopleMatch,
              "Date Match:",
              isDateMatch
            );
        

      if (isLocationMatch && isNumOfPeopleMatch && isDateMatch) {
        return true;
      } else {
        return false;
      }
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
        <FilterInput onSearch={handleSearch} houses={props.houses} />
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
        noPeople: house.noPeople,
        id: house._id.toString(),
      })),
    },
    revalidate: 10,
  };
}

export default HomePage;
