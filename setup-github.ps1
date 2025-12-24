# Script to setup Git and push to GitHub
# Repository: https://github.com/saadmdev/fullstack-ecommerce-mern

Write-Host "Setting up Git repository..." -ForegroundColor Cyan

# Check if git is installed
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "Error: Git is not installed. Please install Git first." -ForegroundColor Red
    exit 1
}

# Initialize git repository
if (-not (Test-Path .git)) {
    Write-Host "Initializing Git repository..." -ForegroundColor Yellow
    git init
} else {
    Write-Host "Git repository already initialized." -ForegroundColor Green
}

# Add remote repository
Write-Host "Adding remote repository..." -ForegroundColor Yellow
git remote remove origin 2>$null
git remote add origin https://github.com/saadmdev/fullstack-ecommerce-mern.git

# Check remote
Write-Host "`nRemote repositories:" -ForegroundColor Cyan
git remote -v

Write-Host "`nNext steps:" -ForegroundColor Green
Write-Host "1. Review the files to be committed:" -ForegroundColor Yellow
Write-Host "   git status" -ForegroundColor White
Write-Host "`n2. Add all files:" -ForegroundColor Yellow
Write-Host "   git add ." -ForegroundColor White
Write-Host "`n3. Commit the changes:" -ForegroundColor Yellow
Write-Host "   git commit -m 'Initial commit: MERN Stack Ecommerce Application'" -ForegroundColor White
Write-Host "`n4. Push to GitHub:" -ForegroundColor Yellow
Write-Host "   git branch -M main" -ForegroundColor White
Write-Host "   git push -u origin main" -ForegroundColor White
Write-Host "`nNote: You may need to authenticate with GitHub." -ForegroundColor Yellow

