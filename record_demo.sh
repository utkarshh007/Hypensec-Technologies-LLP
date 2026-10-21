#!/usr/bin/env bash
set -e

mkdir -p .playwright-cli
mkdir -p .aistudio/artifacts/computer_use
mkdir -p public

echo "Closing existing browser sessions..."
playwright-cli close-all 2>/dev/null || true

echo "Opening http://localhost:3000..."
playwright-cli open --browser=chromium http://localhost:3000
playwright-cli resize 1280 800

echo "Starting video recording..."
playwright-cli video-start .playwright-cli/demo.webm --size 1280x800 --fps 30 --cursor

sleep 2

echo "Interacting with Continuous Exposure Loop..."
playwright-cli click 'button:has-text("2. Contextual Triage")'
sleep 1.8

playwright-cli click 'button:has-text("3. Guided Remediation")'
sleep 1.8

playwright-cli click 'button:has-text("4. Continuous Assurance")'
sleep 1.8

playwright-cli click 'button:has-text("1. Asset Discovery")'
sleep 1.8

echo "Scrolling to customer logo carousel..."
playwright-cli eval '() => window.scrollTo({ top: 950, behavior: "smooth" })'
sleep 3.5

echo "Scrolling to core capabilities switcher..."
playwright-cli eval '() => window.scrollTo({ top: 1550, behavior: "smooth" })'
sleep 2

playwright-cli click 'button:has-text("Targeted Risk Solutions (6)")'
sleep 2

playwright-cli click 'button:has-text("Specialized Security Services (6)")'
sleep 2

echo "Scrolling to living risk register..."
playwright-cli eval '() => window.scrollTo({ top: 2350, behavior: "smooth" })'
sleep 2

playwright-cli click 'button:has-text("Unauthenticated Information Disclosure")'
sleep 2

playwright-cli click 'button:has-text("Overly Permissive S3 Bucket ACL")'
sleep 2

echo "Navigating to Services page..."
playwright-cli eval '() => window.scrollTo({ top: 0, behavior: "smooth" })'
sleep 1.5

playwright-cli click 'header button:has-text("Services")'
sleep 2.5

echo "Navigating to Solutions page..."
playwright-cli click 'header button:has-text("Solutions")'
sleep 2.5

echo "Opening Consultation Modal..."
playwright-cli click 'header button:has-text("Book Consultation")'
sleep 2

echo "Filling consultation inquiry..."
playwright-cli fill '#contact-name' 'Alex Chen'
sleep 0.8
playwright-cli fill '#contact-email' 'alex.chen@nexuscorp.com'
sleep 0.8
playwright-cli fill '#contact-company' 'Nexus Technologies'
sleep 0.8
playwright-cli fill '#contact-message' 'Requesting comprehensive external perimeter penetration testing and cloud security posture evaluation.'
sleep 1.5

playwright-cli click 'button[type="submit"]'
sleep 3

playwright-cli click 'button:has-text("Done")'
sleep 1.5

echo "Stopping video recording..."
playwright-cli video-stop

echo "Closing browser..."
playwright-cli close

echo "Converting to high-compatibility MP4 with ffmpeg..."
ffmpeg -y -i .playwright-cli/demo.webm -c:v libx264 -preset fast -pix_fmt yuv420p -movflags +faststart -r 30 public/hypensec-demo-walkthrough.mp4
cp .playwright-cli/demo.webm public/hypensec-demo-walkthrough.webm
cp public/hypensec-demo-walkthrough.mp4 .aistudio/artifacts/computer_use/
cp public/hypensec-demo-walkthrough.webm .aistudio/artifacts/computer_use/

echo "Demo video recorded successfully!"
ls -lh public/hypensec-demo-walkthrough.*
