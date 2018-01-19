
//https://www.theguardian.com/politics/2018/jan/18/taxpayers-to-foot-200bn-bill-for-pfi-contracts-audit-office
//?utm_source=esp&utm_medium=Email&utm_campaign=GU+Today+main+NEW+H+categories&utm_term=260850&subid=22703671&CMP=EMCNEWEML6619I2

var strippedParams = [ "utm_source", "utm_medium", "utm_campaign", "utm_term"]

var filter = {
  url:
  [
    {queryContains: "utm_source"},
    {queryContains: "utm_medium"},
    {queryContains: "utm_campaign"},
    {queryContains: "utm_term"}
  ]
}

function removeParam(key, sourceURL) {
    var rtn = sourceURL.split("?")[0],
        param,
        params_arr = [],
        queryString = (sourceURL.indexOf("?") !== -1) ? sourceURL.split("?")[1] : "";
    if (queryString !== "") {
        params_arr = queryString.split("&");
        for (var i = params_arr.length - 1; i >= 0; i -= 1) {
            param = params_arr[i].split("=")[0];
            if (param === key) {
                params_arr.splice(i, 1);
            }
        }
        rtn = rtn + "?" + params_arr.join("&");
    }
    return rtn;
}

function stripUtm(url) {
  console.log("stripUtm url: " + url);

  var alteredUrl = url;
  for (var key in strippedParams) {
    alteredUrl = removeParam(key, alteredUrl);
  }

  if (alteredUrl !== url) {
    console.log("Stripped: " + url + " -> " + alteredUrl);
    return alteredUrl;
  }
}

function onUpdated(tab) {
  console.log(`Updated tab: ${tab.id}`);
}

function onError(error) {
  console.log(`Error: ${error}`);
}

function handleUpdate(tabId, changeInfo, tabInfo) {
  if (changeInfo.url) {
    console.log("Tab: " + tabId + " URL changed to " + changeInfo.url);
    var targetUrl = stripUtm(changeInfo.url);
    if (typeof targetUrl !== 'undefined') {
      console.log("Rewriting tab url to: " + targetUrl);
      var updating = browser.tabs.update({url: targetUrl});
      updating.then(onUpdated, onError);

    }
  }
}

browser.tabs.onUpdated.addListener(
  handleUpdate
);
