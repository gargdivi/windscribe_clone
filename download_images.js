const https = require('https');
const fs = require('fs');
const path = require('path');

const images = {
    // Logo and Brand
    'logo.png': 'https://windscribe.com/static/images/logo.png',
    'favicon.ico': 'https://windscribe.com/favicon.ico',

    // Feature Images
    'feature1.png': 'https://windscribe.com/static/images/features/speed.png',
    'feature2.png': 'https://windscribe.com/static/images/features/security.png',
    'feature3.png': 'https://windscribe.com/static/images/features/privacy.png',
    'feature-security.png': 'https://windscribe.com/static/images/features/security-detail.png',
    'feature-privacy.png': 'https://windscribe.com/static/images/features/privacy-detail.png',
    'feature-streaming.png': 'https://windscribe.com/static/images/features/streaming.png',
    'feature-gaming.png': 'https://windscribe.com/static/images/features/gaming.png',

    // Platform Icons
    'windows-icon.png': 'https://windscribe.com/static/images/platforms/windows.png',
    'mac-icon.png': 'https://windscribe.com/static/images/platforms/mac.png',
    'linux-icon.png': 'https://windscribe.com/static/images/platforms/linux.png',
    'android-icon.png': 'https://windscribe.com/static/images/platforms/android.png',
    'ios-icon.png': 'https://windscribe.com/static/images/platforms/ios.png',

    // Hero Images
    'hero-bg.png': 'https://windscribe.com/static/images/hero-bg.png',
    'hero-devices.png': 'https://windscribe.com/static/images/hero-devices.png'
};

// Create images directory if it doesn't exist
const imagesDir = path.join(__dirname, 'images');
if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir);
}

// Download function
function downloadImage(url, filename) {
    return new Promise((resolve, reject) => {
        const filepath = path.join(imagesDir, filename);
        const file = fs.createWriteStream(filepath);

        https.get(url, (response) => {
            if (response.statusCode !== 200) {
                reject(new Error(`Failed to download ${filename}: ${response.statusCode}`));
                return;
            }

            response.pipe(file);

            file.on('finish', () => {
                file.close();
                console.log(`Downloaded: ${filename}`);
                resolve();
            });
        }).on('error', (err) => {
            fs.unlink(filepath, () => {}); // Delete the file if there's an error
            reject(err);
        });
    });
}

// Download all images
async function downloadAllImages() {
    console.log('Starting image downloads...');
    
    for (const [filename, url] of Object.entries(images)) {
        try {
            await downloadImage(url, filename);
        } catch (error) {
            console.error(`Error downloading ${filename}:`, error.message);
        }
    }
    
    console.log('All downloads completed!');
}

// Run the download
downloadAllImages(); 