import HouseList from "../components/houses/HouseList";
import { Container } from "react-bootstrap";
import { MongoClient } from "mongodb";
import { Fragment, useState } from "react";
import Head from "next/head";
import Slogan from "../components/layout/Slogan";
import FilterInput from "../components/filter/FilterInput";


function HomePage(props) {
  const [filteredHouses, setFilteredHouses] = useState(props.houses);

  const handleSearch = (filters, dateRange) => {
    const filteredData = props.houses.filter((house) => {
      const isLocationMatch =
        filters.location === "" ||
        house.location.toLowerCase() === filters.location.toLowerCase();
      const isNumOfPeopleMatch =
        filters.numOfPeople === "" ||
        house.noPeople >= parseInt(filters.numOfPeople);
      const isDateMatch =
        dateRange.length === 0 ||
        (house.rentalAvailability.start <= dateRange[0] &&
          house.rentalAvailability.end >= dateRange[1]);
  
      if (isLocationMatch && isNumOfPeopleMatch || isDateMatch) {
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
        <FilterInput onSearch={handleSearch} houses={props.houses}/>
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
