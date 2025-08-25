export async function getApiResponse(sub_url: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL; // should be https://api.themoviedb.org/3
    if (!baseUrl) throw new Error("Missing NEXT_PUBLIC_API_URL");

    // ensure leading slash
    const endpoint = sub_url.startsWith("/") ? sub_url : `/${sub_url}`;

    const url = `${baseUrl}${endpoint}`;

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
      },
    };

    const res = await fetch(url, options);
    if (!res.ok) {
      throw new Error(`Failed to fetch ${url}: ${res.status}`);
    }

    return await res.json();
  } catch (err) {
    console.error("API Error:", err);
    return Promise.reject(err);
  }
}
