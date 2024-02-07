export const getTranslation = async (inputString, sLang, tLang) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  let apiURL = `https://demo-api.models.ai4bharat.org/inference/translation/v2`;
  const myRes = await fetch(apiURL, {
    method: "POST",
    body: payload,
    headers: myHeaders,
  })
    .then(response => {
      return response.text();
    })
    .then(response => {
      let res = JSON.parse(response);
      return res["output"][0]["target"];
    })
    .catch(error => console.log("error", error));

  // console.log("outside fetch", myRes);
  return myRes;
};