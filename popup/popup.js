"use strict";

// Toggle extension enabled/disabled status
function toggleEnabledDisabled() {
  var globalEnabled = document.getElementById('onoffswitch').checked;
  browser.storage.local.set({ "globalEnabled": globalEnabled });
}

/**
 * Fill in content into the popup on load
 */
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById('onoffswitch').addEventListener('click', toggleEnabledDisabled);
});
