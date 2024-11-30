const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const headersList = {
  Accept: "application/json",
  //   "User-Agent": "Thunder Client (https://www.thunderclient.com)",
  apikey: key,
  prefer: "return=representation",
  "Content-Type": "application/json",
};

export async function getSubs() {
  const response = await fetch(
    "https://pxrbkchnbumeogupymca.supabase.co/rest/v1/Subscriptions"
    // {
    //   method: "GET",
    //   headers: headersList,
    // }
  );

  const data = await response.json();
  return data;
}

export async function postSub(subdata) {
  const response = await fetch(url, {
    method: "POST",
    headers: headersList,
    body: JSON.stringify(subdata),
  });

  const data = await response.json();
  return data;
}

export async function deleteSub(id) {
  const response = await fetch(`${url}?id=eq.${id}`, {
    method: "DELETE",
    headers: headersList,
  });
  const data = await response.json();
  return data;
}

export async function getSubById(id) {
  const response = await fetch(`${url}?id=eq.${id}`, {
    method: "GET",
    headers: headersList,
  });
  const data = await response.json();
  console.log("API Response Data:", data); // Log the API response

  return data[0];
}

// export async function getSubById(id) {
//   const response = await fetch(`${url}?id=eq.${id}`, {
//     method: "GET",
//     headers: headersList,
//   });
//   const data = await response.json();
//   console.log("getSubById response:", data); // Debug here
//   return data[0]; // Ensure the API returns an array, and data[0] exists
// }

export async function updateSub(id, subdata) {
  const response = await fetch(`${url}?id=eq.${id}`, {
    method: "PATCH",
    headers: headersList,
    body: JSON.stringify(subdata),
  });
  const data = await response.json();
  return data;
}
