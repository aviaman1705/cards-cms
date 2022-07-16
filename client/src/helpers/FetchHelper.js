let baseUrl = "https://mycardsdb-f82f6-default-rtdb.firebaseio.com";

export function register(data, callback) {
  fetch(`${baseUrl}/users.json`, {
    method: "POST",
    body: JSON.stringify(data),
  })
    .then((x) => x.json())
    .then((x) => callback(x))
    .catch((x) => callback(x));
}

export function signInUser(data, callback) {
  let url =
    baseUrl + "https://mycardsdb-default-rtdb.firebaseio.com/users.json";
  let obj = getConfigurationForPostRequest(data);
  fetch(url, obj)
    .then((x) => {
      return x.json();
    })
    .then((x) => {
      callback(x);
    })
    .catch((x) => {
      callback(x);
    });
}

export function addFaveoriteCard(cardId, token, callback) {
  let url = baseUrl + "/api/users/addFaveoriteCard";
  let obj = getConfigurationForPostRequest(cardId);
  obj.headers["x-auth-token"] = token;

  fetch(url, obj)
    .then((x) => x.json())
    .then((x) => callback(x))
    .catch((x) => callback(x));
}

export function getMeData(token, callback) {
  if (!token) return;
  let url = baseUrl + "/api/users/me";
  fetch(url, { headers: { "x-auth-token": token } })
    .then((x) => x.json())
    .then((x) => callback(x))
    .catch((x) => callback(x));
}

export function getUsersCount(callback) {
  let url = baseUrl + "/api/users/userscount";
  fetch(url)
    .then((x) => x.json())
    .then((x) => callback(x))
    .catch((x) => callback(x));
}

export function getBusinessCount(callback) {
  let url = baseUrl + "/api/users/businessCount";
  fetch(url)
    .then((x) => x.json())
    .then((x) => callback(x))
    .catch((x) => callback(x));
}

//cards
export function searchBusiness(categoryId, cityId, callback) {
  let url = `https://mycardsdb-default-rtdb.firebaseio.com/cards.js`;
  fetch(url)
    .then((x) => x.json())
    .then((x) => callback(x))
    .catch((x) => callback(x));
}

export function getFavoritesCards(token, callback) {
  let url = baseUrl + "/api/cards/favorites";
  fetch(url, { headers: { "x-auth-token": token } })
    .then((x) => x.json())
    .then((x) => callback(x))
    .catch((x) => callback(x));
}

export function getSearchResults(token, key, callback) {
  let url = baseUrl + "/api/cards/search/" + key;
  fetch(url, { headers: { "x-auth-token": token } })
    .then((x) => x.json())
    .then((x) => callback(x))
    .catch((x) => callback(x));
}

export function getUserFavoritesCards(token, callback) {
  let url = baseUrl + "/api/users/favorites";
  fetch(url, { headers: { "x-auth-token": token } })
    .then((x) => x.json())
    .then((x) => callback(x))
    .catch((x) => callback(x));
}

//cards
export function createCard(card) {
  return new Promise(function (resolve, reject) {
    fetch(`${baseUrl}/cards.json`, {
      method: "POST",
      body: JSON.stringify(card),
    })
      .then(function (response) {
        if (response.ok) {
          let responseText = JSON.stringify(response.text());
          console.log(responseText);
          resolve(responseText);
        } else {
          reject(
            new Error(
              `Unable to retrieve events.\nInvalid response received - (${response.status}).`
            )
          );
        }
      })
      .catch(function (error) {
        reject(new Error(`Unable to retrieve events.\n${error.message}`));
      });
  });
}

export async function getMeCards(callback) {
  const response = await fetch(`${baseUrl}/cards.json`);
  const responseData = await response.json();

  if (!response.ok) {
    throw new Error("Somthing went wrong");
  }

  const loadedCards = [];

  for (const key in responseData) {
    loadedCards.push({
      id: key,
      bizAddress: responseData[key].bizAddress,
      bizDescription: responseData[key].bizDescription,
      bizImage: responseData[key].bizImage,
      bizName: responseData[key].bizName,
      bizPhone: responseData[key].bizPhone,
      user_id: responseData[key].user_id,
    });
  }

  callback(loadedCards);
}

export function editCard(data, callback) {
  let url = `${baseUrl}/cards.json/${data.id}`;

  fetch(url, {
    method: "PUT",
    body: JSON.stringify({
      bizName: data.bizName,
      bizDescription: data.bizDescription,
      bizAddress: data.bizAddress,
      bizPhone: data.bizPhone,
      bizImage: data.bizImage,
    }),
  })
    .then((x) => x.json())
    .then((x) => callback(x))
    .catch((x) => callback(x));
}

export function deleteCard(idToDelete, token, callback) {
  let url = baseUrl + "/api/cards/" + idToDelete;
  fetch(url, { method: "DELETE", headers: { "x-auth-token": token } })
    .then((x) => x.json())
    .then((x) => callback(x))
    .catch((x) => callback(x));
}

export function deleteCardFromFaveorite(idToDelete, token, callback) {
  let url = baseUrl + "/api/users/deleteFaveorite/" + idToDelete;
  fetch(url, { method: "DELETE", headers: { "x-auth-token": token } })
    .then((x) => x.json())
    .then((x) => callback(x))
    .catch((x) => callback(x));
}

//cities
export function createCities(city, callback) {
  fetch(`${baseUrl}/cities.json`, {
    method: "POST",
    body: JSON.stringify(city),
  })
    .then((x) => x.json())
    .then((x) => callback(x))
    .catch((x) => callback(x));
}

export function getCities(callback) {
  fetch(`${baseUrl}/cities.json`)
    .then((x) => x.json())
    .then((x) => callback(x))
    .catch((x) => callback(x));
}

//categories
export function createCategory(category, callback) {
  fetch(`${baseUrl}/categories.json`, {
    method: "POST",
    body: JSON.stringify(category),
  })
    .then((x) => x.json())
    .then((x) => callback(x))
    .catch((x) => callback(x));
}
export function getCategories(callback) {
  fetch(`${baseUrl}/categories.json`)
    .then((x) => x.json())
    .then((x) => callback(x))
    .catch((x) => callback(x));
}

function getConfigurationForPostRequest(data) {
  return {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(data),
  };
}
