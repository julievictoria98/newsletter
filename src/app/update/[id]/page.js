import { getSubById, deleteSub, updateSub } from "@/lib/api";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function page({ params }) {
  const { id } = params;
  const subscriber = await getSubById(id);

  async function handleDelete() {
    "use server";
    await deleteSub(id);
    revalidatePath("/");
    redirect("/");
  }

  async function handleUpdate(formData) {
    "use server";

    const email = formData.get("email");
    const name = formData.get("name");

    const data = {
      email,
      name,
    };

    console.log(email, name);

    await updateSub(id, data);
    revalidatePath("/");
    redirect("/");
  }

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded">
      <h1 className="text-2xl font-bold mb-4">Update Subscriber</h1>
      <form action={handleUpdate}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            defaultValue={subscriber.name}
            className="w-full px-3 py-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            defaultValue={subscriber.email}
            className="w-full px-3 py-2 border border-gray-300 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Update
        </button>
      </form>
      <form action={handleDelete}>
        <button
          type="submit"
          className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 mt-4"
        >
          Delete Subscriber
        </button>
      </form>
    </div>
  );
}

export default page;
