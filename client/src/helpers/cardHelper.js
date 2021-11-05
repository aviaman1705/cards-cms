const getElemVal = (id) => document.getElementById(id).value;

export default function validateCard(
  idName,
  idDescription,
  idBusinessAddress,
  idBusinessPhone,
  idBasicBusinessImage
) {
  let error = "";
  var data = {
    bizName: getElemVal(idName),
    bizDescription: getElemVal(idDescription),
    bizAddress: getElemVal(idBusinessAddress),
    bizPhone: getElemVal(idBusinessPhone),
    bizImage: getElemVal(idBasicBusinessImage),
  };

  if (!data.bizName || data.bizName.length < 2) {
    error = `*Name must atleast 2 letters  *`;
  }

  if (!data.bizDescription || data.bizDescription.length < 2) {
    error = `*Description must atleast 2 letters  *`;
  }

  if (!data.bizAddress || data.bizAddress.length < 2) {
    error = `*Address must atleast 2 letters  *`;
  }
  if (data.bizPhone) {
    var reges = /^0\d([\d]{0,1})([-]{0,1})\d{7}$/;
    var res = reges.test(data.bizPhone);
    if (!res) {
      error += "Must enter  valid phone *";
    }
  } else {
    error += "Must enter  valid phone *";
  }

  return error || data;
}
