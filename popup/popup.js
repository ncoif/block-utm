"use strict";

// Change the UI to reflect extension enabled/disabled
function updateEnabledDisabledUI() {
  browser.storage.local.get("globalEnabled").then(function(option) {
    document.getElementById('onoffswitch').checked = option.globalEnabled;
  });
}

// Toggle extension enabled/disabled status
function toggleEnabledDisabled() {
  var globalEnabled = document.getElementById('onoffswitch').checked;
  browser.storage.local.set({ "globalEnabled": globalEnabled });
}

/**
 * Fill in content into the popup on load
 */
document.addEventListener("DOMContentLoaded", function () {
  // Set up the enabled/disabled switch
  updateEnabledDisabledUI();
  document.getElementById('onoffswitch').addEventListener('click', toggleEnabledDisabled);

  // Print the extension's current version.
  var the_manifest = chrome.runtime.getManifest();
  var version_info = document.getElementById('current-version');
  version_info.innerText = the_manifest.version;
});
