import { getSubsById, updateSub, deleteSub } from "@/app/lib/api";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

async function SingleView({ params }) {
  const { id } = params;

  const subscriberArray = await getSubsById(id);
  const subscriber = subscriberArray[0];

  console.log("id", id);
  console.log("subscriber", subscriberArray);

  async function handleUpdate(FormData) {
    // "use server";
    const data = {
      name: FormData.get("name"),
      email: FormData.get("email"),
    };
    console.log("FormData:", data);

    await updateSub(id, data);
    revalidatePath("/");
    redirect("/");
  }

  async function handleDelete() {
    // "use server";
    await deleteSub(id);
    revalidatePath("/");
    redirect("/");
  }

  return (
    <section className="grid justify-center items-center w-svw h-svh">
      <form
        action={handleUpdate}
        className="bg-white w-72 rounded-lg p-3 grid gap-2 h-fit"
      >
        <legend>
          <h1 className="text-black text-2xl">Update Subscriber</h1>
        </legend>
        <div className="flex flex-col">
          <label htmlFor="name" className="text-black">
            Name
          </label>
          <input
            type="text"
            defaultValue={subscriber.name}
            id="name"
            name="name"
            className="bg-gray-100 text-black"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email" className="text-black">
            Email
          </label>
          <input
            type="email"
            defaultValue={subscriber.email}
            id="email"
            name="email"
            className="bg-gray-100 text-black"
            required
          />
        </div>
        <div className="flex justify-around">
          <button
            formAction={handleDelete}
            className="bg-red-500 rounded-xl p-2 w-fit"
          >
            Delete
          </button>
          <button className="bg-blue-500 rounded-xl p-2">Save changes</button>
        </div>
      </form>
    </section>
  );
}

export default SingleView;
