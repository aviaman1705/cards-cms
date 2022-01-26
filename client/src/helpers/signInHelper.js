const getElemVal = (id) => document.getElementById(id).value;

export default function validateSignIn(idEmail, idPassword) {
  let notValidFrom = true;
  var data = {
    email: getElemVal(idEmail),
    password: getElemVal(idPassword),
  };

  if (!data.password || data.password.length < 6) {
    document.getElementById(
      idPassword
    ).nextSibling.innerText = `*Password must hace 6 letters *`;
    notValidFrom = false;
  } else {
    document.getElementById(idPassword).nextSibling.innerText = ``;
  }

  if (data.email) {
    var reges = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    var res = reges.test(data.email);
    if (!res) {
      document.getElementById(idEmail).nextSibling.innerText =
        "Must enter valid email *";
      notValidFrom = false;
    } else {
      document.getElementById(idEmail).nextSibling.innerText = ``;
    }
  } else {
    document.getElementById(idEmail).nextSibling.innerText =
      "Must enter  valid email *";
    notValidFrom = false;
  }

  return !notValidFrom || data;
}
