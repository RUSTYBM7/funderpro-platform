#!/usr/bin/env python3
"""Download all external assets from funderpro.com and save locally."""

import os
import re
import urllib.request
import urllib.error
from urllib.parse import urljoin
import ssl
from datetime import datetime

# Create directories
BASE_DIR = '/workspace/funderpro-platform/public/funderpro'
ASSETS_DIR = f'{BASE_DIR}/assets'
FONTS_DIR = f'{ASSETS_DIR}/fonts'
CSS_DIR = f'{ASSETS_DIR}/css'
JS_DIR = f'{ASSETS_DIR}/js'
IMGS_DIR = f'{ASSETS_DIR}/images'

os.makedirs(FONTS_DIR, exist_ok=True)
os.makedirs(CSS_DIR, exist_ok=True)
os.makedirs(JS_DIR, exist_ok=True)
os.makedirs(IMGS_DIR, exist_ok=True)

# Ignore SSL errors
ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

def download_file(url, local_path):
    """Download a file from URL and save locally."""
    try:
        print(f"  Downloading: {url[:80]}...")
        urllib.request.urlretrieve(url, local_path)
        print(f"  ✓ Saved: {local_path}")
        return True
    except Exception as e:
        print(f"  ✗ Failed: {e}")
        return False

def sanitize_filename(url):
    """Convert URL to a safe filename."""
    if '?' in url:
        url = url.split('?')[0]
    filename = url.split('/')[-1]
    if not filename or '.' not in filename:
        timestamp = datetime.now().strftime('%Y%m%d%H%M%S')
        filename = f'file_{timestamp}'
    return filename

def process_html_for_assets(html_file):
    """Process an HTML file and download all external assets."""
    filepath = f'{BASE_DIR}/{html_file}'
    print(f"\n📄 Processing: {html_file}")

    with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()

    original_content = content
    downloads = []

    # Find all external URLs
    # 1. Stylesheets (CSS)
    css_patterns = [
        r'href="(https://[^"]+\.css[^"]*)"',
        r"href='(https://[^']+\.css[^']*)'",
    ]

    for pattern in css_patterns:
        for match in re.findall(pattern, content):
            if 'funderpro.com' in match or 'cdn' in match or 'fonts.googleapis' in match:
                downloads.append(('css', match))

    # 2. JavaScript files
    js_patterns = [
        r'src="(https://[^"]+\.js[^"]*)"',
        r"src='(https://[^']+\.js[^']*)'",
    ]

    for pattern in js_patterns:
        for match in re.findall(pattern, content):
            if 'funderpro.com' in match or 'cdn' in match:
                downloads.append(('js', match))

    # 3. Font files
    font_patterns = [
        r'url\("(https://[^"]+\.(woff2?|ttf|otf|eot)[^"]*)"\)',
        r"url\('(https://[^']+\.(woff2?|ttf|otf|eot)[^']*)'\)",
        r'href="(https://[^"]+\.(woff2?|ttf|otf|eot)[^"]*)"',
    ]

    for pattern in font_patterns:
        for match in re.findall(pattern, content):
            if 'funderpro.com' in match or 'fonts.g' in match or 'cdnjs' in match:
                downloads.append(('font', match))

    # 4. Images
    img_patterns = [
        r'src="(https://[^"]+\.(png|jpg|jpeg|gif|svg|webp|ico)[^"]*)"',
        r"src='(https://[^']+\.(png|jpg|jpeg|gif|svg|webp|ico)[^']*)'",
        r'srcset="([^"]+)"',
        r'background-image:\s*url\("(https://[^"]+)"\)',
    ]

    for pattern in img_patterns:
        for match in re.findall(pattern, content):
            if isinstance(match, str) and 'funderpro.com' in match:
                downloads.append(('img', match))

    # Download and replace assets
    replacements = {}
    for asset_type, url in downloads:
        if url in replacements:
            continue

        try:
            if asset_type == 'css':
                filename = sanitize_filename(url)
                local_path = f'{CSS_DIR}/{filename}'
                if download_file(url, local_path):
                    local_url = f'/funderpro/assets/css/{filename}'
                    replacements[url] = local_url

            elif asset_type == 'js':
                filename = sanitize_filename(url)
                local_path = f'{JS_DIR}/{filename}'
                if download_file(url, local_path):
                    local_url = f'/funderpro/assets/js/{filename}'
                    replacements[url] = local_url

            elif asset_type == 'font':
                ext = url.split('.')[-1].split('?')[0]
                filename = sanitize_filename(url)
                if not filename.endswith(('.woff2', '.woff', '.ttf', '.otf', '.eot')):
                    filename = f'{filename}.{ext}'
                local_path = f'{FONTS_DIR}/{filename}'
                if download_file(url, local_path):
                    local_url = f'/funderpro/assets/fonts/{filename}'
                    replacements[url] = local_url

            elif asset_type == 'img':
                ext = url.split('.')[-1].split('?')[0]
                filename = sanitize_filename(url)
                if not any(ext in filename for ext in ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp', '.ico']):
                    filename = f'{filename}.jpg'
                local_path = f'{IMGS_DIR}/{filename}'
                if download_file(url, local_path):
                    local_url = f'/funderpro/assets/images/{filename}'
                    replacements[url] = local_url

        except Exception as e:
            print(f"  ✗ Error downloading {url}: {e}")

    # Replace all external URLs with local paths
    for old_url, new_url in replacements.items():
        content = content.replace(old_url, new_url)

    # Save updated file
    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"  ✓ Updated {len(replacements)} asset references")

    print(f"  📊 Downloaded {len(downloads)} assets from {html_file}")

# Process main index.html first to get core assets
print("=" * 60)
print("🚀 Starting asset download from funderpro.com")
print("=" * 60)

# List of HTML files to process
html_files = [
    'index.html',
    'features.html',
    'challenges.html',
    'the-challenge.html',
    'trading-rules.html',
    'rewards.html',
    'careers.html',
    'about-us.html',
    'contact-us.html',
    'blog.html',
    'products-and-spreads.html',
    'trading-platforms.html',
    'economic-calendar.html',
    'tools-for-traders.html',
    'prop-trading-technology.html',
    'become-affiliate.html',
    'sitemap.html',
    'terms-conditions.html',
    'privacy-notice.html',
    'cookies-policy.html',
    'risk-disclaimer.html',
    'general-terms-of-use.html',
]

total_downloads = 0

for html_file in html_files:
    filepath = f'{BASE_DIR}/{html_file}'
    if os.path.exists(filepath):
        process_html_for_assets(html_file)
    else:
        print(f"\n⚠️ File not found: {html_file}")

print("\n" + "=" * 60)
print("✅ Asset download complete!")
print(f"📁 Assets saved to: {ASSETS_DIR}")
print("=" * 60)