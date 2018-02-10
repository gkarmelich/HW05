// Brunch automatically concatenates all files in your
// watched paths. Those paths can be configured at
// config.paths.watched in "brunch-config.js".
//
// However, those files will only be executed if
// explicitly imported. The only exception are files
// in vendor, which are never wrapped in imports and
// therefore are always executed.

// Import dependencies
//
// If you no longer want to use a dependency, remember
// to also remove its path from "config.paths.watched".
import "phoenix_html";
import socket from "./socket"
import run_demo from "./demo";

function landing_init() {
  $("#user_game").keyup(() => {
    let name = $("#user_game").val();
    $("#add").attr("href", "/game/".concat(name));
  });  
}

function init() {
  let root = document.getElementById("game");
  
  if (root) {
    let channel = socket.channel("memory:" + window.gameName, {});
    run_demo(root, channel);
  }
  
  if (document.getElementById("landing")) {
    landing_init();
  }
}

// Use jQuery to delay until page loaded.
$(init);