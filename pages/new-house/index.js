import { useRouter } from 'next/router';
import NewHouseForm from "../../components/houses/NewHouseForm";

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
    <>
      <NewHouseForm onAddProperty={addPropertyHandler} />
    </>
  );
}

export default NewHousePage;
