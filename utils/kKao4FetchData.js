// Author: kKao4

async function kKao4FetchData(url, options = {}) {
  const defaultOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: null,
  };
  const config = {
    ...defaultOptions,
    ...options,
  };
  if ((config.method === "POST" || config.method === "PUT") && config.body) {
    config.body = JSON.stringify(config.body);
  }
  try {
    const response = await fetch(url, config);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}