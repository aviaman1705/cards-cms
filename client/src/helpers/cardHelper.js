const getElemVal = (id) => document.getElementById(id).value;

export default function validateCard(
  idName,
  idDescription,
  idBusinessAddress,
  idBusinessPhone,
  idBasicBusinessImage
) {
  debugger;
  let notValidFrom = true;
  var data = {
    bizName: getElemVal(idName),
    bizDescription: getElemVal(idDescription),
    bizAddress: getElemVal(idBusinessAddress),
    bizPhone: getElemVal(idBusinessPhone),
    bizImage: getElemVal(idBasicBusinessImage),
  };

  if (!data.bizName || data.bizName.length < 2) {
    document.getElementById(
      idName
    ).nextSibling.innerText = `*Name must atleast 2 letters *`;
    notValidFrom = false;
  } else {
    document.getElementById(idName).nextSibling.innerText = ``;
  }

  if (!data.bizDescription || data.bizDescription.length < 2) {
    document.getElementById(
      idDescription
    ).nextSibling.innerText = `*Description must atleast 2 letters *`;
    notValidFrom = false;
  } else {
    document.getElementById(idDescription).nextSibling.innerText = ``;
  }

  if (!data.bizAddress || data.bizAddress.length < 2) {
    document.getElementById(
      idBusinessAddress
    ).nextSibling.innerText = `*Address must atleast 2 letters *`;
    notValidFrom = false;
  } else {
    document.getElementById(idBusinessAddress).nextSibling.innerText = ``;
  }

  if (data.bizPhone) {
    var regexPhone = /^0\d([\d]{0,1})([-]{0,1})\d{7}$/;
    let res = regexPhone.test(data.bizPhone);
    if (!res) {
      document.getElementById(idBusinessPhone).nextSibling.innerText =
        "Must enter valid phone *";
      notValidFrom = false;
    } else {
      document.getElementById(idBusinessPhone).nextSibling.innerText = "";
    }
  } else {
    document.getElementById(idBusinessPhone).nextSibling.innerText =
      "Must enter valid phone *";
    notValidFrom = false;
  }

  if (data.bizImage) {
    var regexImages = /([a-z\-_0-9]*\.(jpg|jpeg|png|gif))/i;
    let res = regexImages.test(data.bizImage);
    if (!res) {
      document.getElementById(idBasicBusinessImage).nextSibling.innerText =
        "Must enter image url*";
      notValidFrom = false;
    } else {
      document.getElementById(idBasicBusinessImage).nextSibling.innerText = "";
    }
  } else {
    document.getElementById(idBasicBusinessImage).nextSibling.innerText =
      "Image is required *";
    notValidFrom = false;
  }

  return !notValidFrom || data;
}
