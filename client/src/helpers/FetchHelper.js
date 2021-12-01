let baseUrl = "http://localhost:3000";

export function registerNewAccount(data, callback) {
  let url = baseUrl + "/api/users";
  let obj = getConfigurationForPostRequest(data);

  fetch(url, obj)
    .then((x) => x.json())
    .then((x) => callback(x))
    .catch((x) => callback(x));
}

export function signInUser(data, callback) {
  let url = baseUrl + "/api/auth";
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

export function getMeCards(token, callback) {
  let url = baseUrl + "/api/users/mecards";
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

export function getFavoritesCards(token, callback) {
  let url = baseUrl + "/api/cards/favorites";
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

export function insertNewCard(data, token, callback) {
  let url = baseUrl + "/api/cards";
  let obj = getConfigurationForPostRequest(data);
  obj.headers["x-auth-token"] = token;

  fetch(url, obj)
    .then((x) => x.json())
    .then((x) => callback(x))
    .catch((x) => callback(x));
}

export function editCard(data, token, callback) {
  let url = baseUrl + "/api/cards/" + data.id;

  fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json", "x-auth-token": token },
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
