const { invoke } = window.__TAURI__.tauri;

let cipher_input;
let cipher_form;
let cipher_output;
let form_data;
let form_data_obj;



/* Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
Rust API calls
*/
async function run_decrypt() {
  cipher_output.value = await invoke("run_decrypt", { input: cipher_input.value, table: form_data_obj }); // pass map in, should become HashMap
}


/*
Helper Functions for initializing
*/
function next_char(c) {
  return String.fromCharCode(c.charCodeAt(0) + 1);
}

function init_form(o_form) {
  var c = 'a';
  while( c != '{' ) {
    o_form.elements[c].value = c;
    c = next_char(c);
  }
}


/*
Main?
*/
window.addEventListener("DOMContentLoaded", () => {
  cipher_input = document.querySelector("#input-text-box");
  const cipher_form = document.querySelector("#replace-form");
  cipher_output = document.querySelector("#output-text-box");

  init_form(cipher_form);
  console.log("init done");

  cipher_form.addEventListener("submit", (e) => {
    e.preventDefault();
    form_data = new FormData(e.target);
    form_data_obj = new Map();
    form_data.forEach((value, key) => form_data_obj.set(key, value));

    run_decrypt();
  });

});
