async function register(params) {
  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  };
  try {
    const response = await fetch(
      "https://70df281730fe0425.mokky.dev/register",
      options
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
}

async function login(params) {
  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  };
  try {
    const response = await fetch(
      "https://70df281730fe0425.mokky.dev/auth",
      options
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
}

async function checkAuth(token) {
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await fetch(
      "https://70df281730fe0425.mokky.dev/auth_me",
      options
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
}

async function getHistory(userId, page = 1) {
  const url = `https://70df281730fe0425.mokky.dev/history?page=${page}&user_id=${userId}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
}

async function addToHistory(userId, movieId, movieName) {
  const url = "https://70df281730fe0425.mokky.dev/history";
  const currentDate = new Date().toISOString();
  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_id: userId,
      kinopoisk_id: movieId,
      movie_name: movieName,
      date: currentDate,
    }),
  };
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}

async function getUsers() {
  const url = "https://70df281730fe0425.mokky.dev/users";
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
}

async function deleteHistoryItem(id) {
  const url = `https://70df281730fe0425.mokky.dev/history/${id}`;
  try {
    const response = await fetch(url, {
      method: "DELETE",
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export { register, login, checkAuth, getHistory, addToHistory, getUsers, deleteHistoryItem };
