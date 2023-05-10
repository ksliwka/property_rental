import HouseDetail from "../../components/houses/HouseDetail";

function HouseDetails() {
  return (
    <HouseDetail
      image="https://images.unsplash.com/photo-1600210492493-0946911123ea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80"
      location="Paris"
      title="apartment"
      rentalAvailability="March"
      description="bla"
    />
  );
}

export async function getStaticPaths() {
  return {
    fallback: false,
    paths: [
      {
        params: {
          houseId: "m1",
        },
      },
      {
        params: {
          houseId: "m2",
        },
      },
    ],
  };
}

export function getStaticProps(context) {
  const meetupId = context.params.meetupId;
  console.log(meetupId);

  return {
    props: {
      houseData: {
        image:
          "https://images.unsplash.com/photo-1600210492493-0946911123ea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80",
        id: meetupId,
        location: "Paris",
        title: "apartment",
        rentalAvailability: "March",
        description: "bla",
      },
    },
  };
}

export default HouseDetails;
