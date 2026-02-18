@echo off
echo ------------------------------------------------------------------
echo                      EASY DEPLOY SCRIPT (ROBUST)
echo ------------------------------------------------------------------
echo.
echo 1. Building Project (with increased memory)...
set NODE_OPTIONS=--max-old-space-size=4096
call npm run build
if %errorlevel% neq 0 (
    echo Build failed! Exiting...
    pause
    exit /b %errorlevel%
)

echo.
echo 2. Preparing Deployment...
cd dist
if exist .git (
    attrib -h .git
    rmdir /s /q .git
)

echo.
echo 3. Initializing Git for Deployment...
git init
git checkout -b gh-pages

echo.
echo 4. Configuring Git Buffer...
git config http.postBuffer 524288000

echo.
echo 5. Committing Files...
git add .
git commit -m "Deploy %date% %time%"

echo.
echo 6. Setting Remote...
git remote add origin https://github.com/arshtiwari163-droid/GURUDAS_DIGITAL_SOLUTION_.git

echo.
echo 7. Pushing to GitHub Pages...
git push -f origin gh-pages

cd ..
echo.
echo ------------------------------------------------------------------
echo                      DEPLOYMENT COMPLETE
echo ------------------------------------------------------------------
echo Your site should be live at:
echo https://arshtiwari163-droid.github.io/GURUDAS_DIGITAL_SOLUTION_/
echo.
pause
