// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::collections::HashMap;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn run_decrypt(input: &str, table: HashMap<char, char>) -> String { 
    let mut output = String::new();

    for c in input.chars() {
        output.push(*table.get(&c).unwrap_or(&c));
    }
    format!("{}", output)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![run_decrypt])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
