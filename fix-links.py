#!/usr/bin/env python3
"""Replace external funderpro.com links with local routes in all HTML files."""

import os
import re
import glob

# Paths to process
html_dir = '/workspace/funderpro-platform/public/funderpro'

# Patterns to replace (external links to local routes)
replacements = [
    # Prop.funderpro.com signup/login links
    (r'href="https://prop\.funderpro\.com/signup"', 'href="/signup"'),
    (r'href="https://prop\.funderpro\.com/login"', 'href="/login"'),
    (r'href="https://prop\.funderpro\.com/signin"', 'href="/login"'),
    (r'href="https://prop\.funderpro\.com/register"', 'href="/signup"'),

    # Main funderpro.com signup/login links
    (r'href="https://funderpro\.com/get-started"', 'href="/signup"'),
    (r'href="https://funderpro\.com/signup"', 'href="/signup"'),
    (r'href="https://funderpro\.com/login"', 'href="/login"'),
    (r'href="https://funderpro\.com/sign-in"', 'href="/login"'),
    (r'href="https://funderpro\.com/register"', 'href="/signup"'),
]

def process_file(filepath):
    """Process a single HTML file and update links."""
    try:
        with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()

        original_content = content
        changes_made = []

        for pattern, replacement in replacements:
            if re.search(pattern, content):
                new_content = re.sub(pattern, replacement, content)
                if new_content != content:
                    content = new_content
                    changes_made.append(f"Replaced: {pattern[:60]}...")

        if content != original_content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            return changes_made
        return None
    except Exception as e:
        print(f"Error processing {filepath}: {e}")
        return None

# Get all HTML files
html_files = glob.glob(f"{html_dir}/*.html")
print(f"Processing {len(html_files)} HTML files...")

total_changes = 0
files_modified = 0

for filepath in html_files:
    changes = process_file(filepath)
    if changes:
        print(f"\n✓ Modified: {os.path.basename(filepath)}")
        for change in changes:
            print(f"  - {change}")
        files_modified += 1
        total_changes += len(changes)

print(f"\n{'='*50}")
print(f"Summary: Modified {files_modified} files with {total_changes} total changes")
print(f"All 'Get Started' and 'Login' buttons now point to local routes!")