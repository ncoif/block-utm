
async function initialize() {
  await initializeOptions();
}
initialize();

//https://www.theguardian.com/politics/2018/jan/18/taxpayers-to-foot-200bn-bill-for-pfi-contracts-audit-office
//?utm_source=esp&utm_medium=Email&utm_campaign=GU+Today+main+NEW+H+categories&utm_term=260850&subid=22703671&CMP=EMCNEWEML6619I2

var isExtensionEnabled = true;

function initializeOptions(){
  return new Promise(resolve => {
    browser.storage.local.get("globalEnabled", function(item) {
      isExtensionEnabled = item.globalEnabled;
      updateIconState();
    });
  });
}

function updateIconState() {
  if (!browser.tabs) return;

  let iconState = 'active';

  if (!isExtensionEnabled) {
    iconState = 'disabled';
  }

  if ('setIcon' in chrome.browserAction) {
    browser.browserAction.setIcon({
      path: {
        38: '../icons/icon-' + iconState + '-32.png'
      }
    });
  }

  browser.browserAction.setTitle({
    title: 'Utm Blocker ' + ((iconState === 'active') ? '' : ' (' + iconState + ')')
  });
}

browser.storage.onChanged.addListener(async function(changes, areaName) {
  if (areaName === 'sync' || areaName === 'local') {
    if ('globalEnabled' in changes) {
      isExtensionEnabled = changes.globalEnabled.newValue;
      updateIconState();
    }
  }
});

var strippedParams = [
  "utm_source",   // This is the source of the link Example: Search Engine, another domain, or name of email list
  "utm_medium",   // This is the method of delivery. EX: Postcard, Email, or Banner Ad
  "utm_campaign", // This is a name that helps you keep track of your different campaign efforts Example: Fall_Drive, Christmas_Special
  "utm_term",     // This is a used to identify paid keywords. Example: speakers, monitors, shoes
  "utm_content"   // This is for split testing or separating two ads that go to the same URL
]

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
  var alteredUrl = url;
  for (var i in strippedParams) {
    var key = strippedParams[i];
    alteredUrl = removeParam(key, alteredUrl);
  }

  if (alteredUrl !== url) {
    console.log("Stripped url to: " + alteredUrl);
    return alteredUrl;
  }
}

function onBeforeRequest(details) {
  // if the extension has been disabled by the user, return directly
  if (!isExtensionEnabled) {
    return;
  }

  var targetUrl = stripUtm(details.url);
  if (typeof targetUrl !== 'undefined') {
    return {redirectUrl: targetUrl};
  }
}

browser.webRequest.onBeforeRequest.addListener(onBeforeRequest, {urls: ["*://*/*"]}, ["blocking"]);
