// import { IoIosArrowForward } from "react-icons/io";
// "use client";
import "../app/style/global.css";

import Newsletter from "@/components/Newsletter";
import { getSubs } from "./lib/api";
import Link from "next/link";

async function page() {
  const subscribers = await getSubs();
  console.log(subscribers);

  return (
    <div className="flex flex-col gap-8 mt-4 items-center">
      <Newsletter />

      <h1 className="font-semibold">All subscriptions</h1>
      <ul className="grid grid-cols-3 gap-3">
        {subscribers.map((sub) => (
          <Link key={sub.id} href={`/update/${sub.id}`}>
            <div className=" w-64 gap-2 flex rounded-md px-2 py-2 bg-slate-100   border justify-between shadow-md cursor-pointer items-center  hover:scale-105">
              <div className="flex flex-col">
                <li>{sub.name}</li>
                <li> {sub.email}</li>
              </div>
              {/* <IoIosArrowForward /> */}
            </div>
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default page;
