import { useRouter } from "next/router";
import  Head  from "next/head";
import NewHouseForm from "../../components/houses/NewHouseForm";
import { Fragment } from "react";

function NewHousePage() {
  const router = useRouter();
  async function addPropertyHandler(enteredHouseData) {
    const response = await fetch("/api/new-house", {
      method: "POST",
      body: JSON.stringify(enteredHouseData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    console.log(data);
    router.push("/");
  }
  return (
    <Fragment>
      <Head>
        <title>Add a new house</title>
        <meta
          name="description"
          content="Share your house and generate extra income while creating a new place for travelers or locals to stay."
        />
      </Head>
      <NewHouseForm onAddProperty={addPropertyHandler} />
    </Fragment>
  );
}

export default NewHousePage;
