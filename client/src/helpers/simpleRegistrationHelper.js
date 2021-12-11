const getElemVal = (id) => document.getElementById(id).value;

export default function validateSimpleRegistration(
  idEmail,
  idPassword,
  idName
) {
  let notValidFrom = true;
  var data = {
    email: getElemVal(idEmail),
    password: getElemVal(idPassword),
    name: getElemVal(idName),
    biz: false,
  };

  if (!data.password || data.password.length < 6) {
    document.getElementById(
      idPassword
    ).nextSibling.innerText = `*Password must hace 6 letters *`;
    notValidFrom = false;
  } else {
    document.getElementById(idPassword).nextSibling.innerText = "";
  }

  if (data.email) {
    var reges =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var res = reges.test(data.email);
    if (!res) {
      document.getElementById(idEmail).nextSibling.innerText =
        "Must enter  valid email *";
      notValidFrom = false;
    } else {
      document.getElementById(idEmail).nextSibling.innerText = "";
    }
  } else {
    document.getElementById(idEmail).nextSibling.innerText =
      "Must enter valid email*";
    notValidFrom = false;
  }

  if (!data.name || data.name.length < 2) {
    document.getElementById(idName).nextSibling.innerText =
      "Name must have at leat two letters";
    notValidFrom = false;
  } else {
    document.getElementById(idName).nextSibling.innerText = "";
  }

  return !notValidFrom || data;
}
