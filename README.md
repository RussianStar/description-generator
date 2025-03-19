# Image LLM Processor

## Overview
This is a simple web-based application that allows you to select a folder of images, process them using a local Language Model (LLM) server, and display the results with descriptions. The application includes settings for specifying the endpoint URL, model, and an optional API key.

## Features
- **Collapsible Settings Section**: Configure the endpoint URL, model, and API key.
- **Image Selection**: Select a folder containing images to process.
- **System and Instruction Prompts**: Enter system and instruction prompts if needed.
- **Process Images Button**: Send the selected images to the LLM server and display the results.
- **Stop Processing Button**: Cancel image processing if needed.
- **Loading Indicator**: Shows that the processing is in progress.
- **Results Display**: Scrollable list of processed images with descriptions, each with a copy button.

## Setup
1. Ensure you have an Ollama server running at the specified endpoint URL (`http://192.168.178.188:11434/api/generate` by default) that can handle POST requests with resized image data in base64 format and return JSON responses containing descriptions.
2. Open `index.html` in a web browser.

## Usage
1. **Settings**:
   - Click the "Settings" button to expand the settings section.
   - Enter the endpoint URL, select the model, and enter an API key if needed.
   
2. **Select Images**:
   - Click the file input to select a folder containing images.
   
3. **Enter Prompts** (optional):
   - Click the "System Prompt" button to expand the system prompt textarea and enter any system prompts.
   - Click the "Instruction Prompt" button to expand the instruction prompt textarea and enter any instruction prompts.
   
4. **Process Images**:
   - Click the "Process Images" button to send the selected images to the LLM server.
   - The loading indicator will show that processing is in progress.
   - Click the "Stop Processing" button if you need to cancel the image processing.
   
5. **View Results**:
   - Once processed, the results will be displayed in a scrollable list with each image and its corresponding description.
   - Click the "Copy" button next to a description to copy it to your clipboard.

## Example
1. Open `index.html` in a web browser.
2. Configure settings if needed (default values should work if you have an Ollama server running at `http://192.168.178.188:11434/api/generate`).
3. Select a folder containing images.
4. Click "Process Images" to see the results.

## Notes
- Ensure that the images are resized to a maximum of 1200x1200 pixels before processing.
- The application uses basic web technologies (HTML, CSS, JavaScript) and should work on most modern browsers without additional installation.
