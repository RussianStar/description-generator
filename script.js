document.addEventListener('DOMContentLoaded', () => {
    const folderInput = document.getElementById('folderInput');
    const systemPrompt = document.getElementById('systemPrompt');
    const instructionPrompt = document.getElementById('instructionPrompt');
    const processButton = document.getElementById('processButton');
    const resultsContainer = document.getElementById('resultsContainer');

    // Toggle visibility of textareas
    document.querySelectorAll('.toggle-button').forEach(button => {
        button.addEventListener('click', () => {
            const textarea = button.nextElementSibling;
            if (textarea.style.display === 'none' || textarea.style.display === '') {
                textarea.style.display = 'block';
            } else {
                textarea.style.display = 'none';
            }
        });
    });

    processButton.addEventListener('click', async () => {
        const files = folderInput.files;
        const systemPromptText = systemPrompt.value.trim();
        const instructionPromptText = instructionPrompt.value.trim();

        if (!files.length) {
            alert('Please select a folder.');
            return;
        }

        const images = Array.from(files).filter(file => file.type.startsWith('image/'));

        for (const image of images) {
            try {
                const resizedImage = await resizeImage(image, 1120, 1120);
                const base64Image = await convertToBase64(resizedImage);

const endpointUrl = document.getElementById('endpointUrl').value;
const modelSelect = document.getElementById('modelSelect').value;
const apiKey = document.getElementById('apiKey').value;

const headers = {
    'Content-Type': 'application/json',
};

if (apiKey) {
    headers['Authorization'] = `Bearer ${apiKey}`;
}

const response = await fetch(endpointUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        model: "llama3.2-vision",
                        images: [base64Image],
                        stream: false,
                        prompt: instructionPromptText
                    })
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const result = await response.json();
                displayResult(image, result.response);
            } catch (error) {
                console.error('Error processing image:', error);
                alert('Failed to process image.');
            }
        }
    });

    function resizeImage(file, maxWidth, maxHeight) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                let width = img.width;
                let height = img.height;

                if (width > height) {
                    if (width > maxWidth) {
                        height *= maxWidth / width;
                        width = maxWidth;
                    }
                } else {
                    if (height > maxHeight) {
                        width *= maxHeight / height;
                        height = maxHeight;
                    }
                }

                const canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);

                canvas.toBlob(blob => {
                    resolve(new File([blob], file.name, { type: file.type }));
                }, file.type);
            };
            img.onerror = reject;
            img.src = URL.createObjectURL(file);
        });
    }

    function convertToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result.split(',')[1]);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }

    function displayResult(imageFile, description) {
        const reader = new FileReader();

        reader.onload = (e) => {
            const imgSrc = e.target.result;
            const resultItem = document.createElement('div');
            resultItem.className = 'result-item';

            const imgElement = document.createElement('img');
            imgElement.src = imgSrc;

            const descriptionDiv = document.createElement('div');
            descriptionDiv.className = 'description';
            descriptionDiv.textContent = description;

            const copyButton = document.createElement('button');
            copyButton.className = 'copy-button';
            copyButton.textContent = 'Copy';

            copyButton.addEventListener('click', () => {
                navigator.clipboard.writeText(description).then(() => {
                    alert('Description copied to clipboard!');
                }).catch(err => {
                    console.error('Failed to copy text: ', err);
                });
            });

            resultItem.appendChild(imgElement);
            resultItem.appendChild(descriptionDiv);
            resultItem.appendChild(copyButton);

            resultsContainer.appendChild(resultItem);
        };

        reader.readAsDataURL(imageFile);
    }
});
