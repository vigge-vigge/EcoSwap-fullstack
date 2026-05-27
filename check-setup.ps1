# EcoSwap Setup Helper Script
# This script helps check prerequisites and guide setup

Write-Host ""
Write-Host "EcoSwap Setup Helper" -ForegroundColor Green
Write-Host "====================" -ForegroundColor Green
Write-Host ""

# Check Node.js
Write-Host "Checking Node.js..." -ForegroundColor Cyan
if (Get-Command node -ErrorAction SilentlyContinue) {
    $nodeVersion = node --version
    Write-Host "[OK] Node.js installed: $nodeVersion" -ForegroundColor Green
}
else {
    Write-Host "[ERROR] Node.js not found. Please install from https://nodejs.org" -ForegroundColor Red
    exit 1
}

# Check PostgreSQL
Write-Host ""
Write-Host "Checking PostgreSQL..." -ForegroundColor Cyan
$pgRunning = $false
try {
    $pgProcess = Get-Process postgres -ErrorAction SilentlyContinue
    if ($pgProcess) {
        Write-Host "[OK] PostgreSQL appears to be running" -ForegroundColor Green
        $pgRunning = $true
    }
}
catch {
    # Check if psql command exists
    if (Get-Command psql -ErrorAction SilentlyContinue) {
        Write-Host "[WARN] PostgreSQL installed but may not be running" -ForegroundColor Yellow
        Write-Host "       Run: Start-Service postgresql-x64-14" -ForegroundColor Yellow
    }
    else {
        Write-Host "[WARN] PostgreSQL not detected" -ForegroundColor Yellow
        Write-Host "       See DATABASE_SETUP.md for installation instructions" -ForegroundColor Yellow
    }
}

# Check dependencies
Write-Host ""
Write-Host "Checking project dependencies..." -ForegroundColor Cyan

$backendNodeModules = Test-Path "backend\node_modules"
$frontendNodeModules = Test-Path "frontend\node_modules"

if ($backendNodeModules) {
    Write-Host "[OK] Backend dependencies installed" -ForegroundColor Green
}
else {
    Write-Host "[ERROR] Backend dependencies missing" -ForegroundColor Red
    Write-Host "        Run: cd backend; npm install" -ForegroundColor Yellow
}

if ($frontendNodeModules) {
    Write-Host "[OK] Frontend dependencies installed" -ForegroundColor Green
}
else {
    Write-Host "[ERROR] Frontend dependencies missing" -ForegroundColor Red
    Write-Host "        Run: cd frontend; npm install" -ForegroundColor Yellow
}

# Check .env file
Write-Host ""
Write-Host "Checking configuration..." -ForegroundColor Cyan
if (Test-Path "backend\.env") {
    Write-Host "[OK] Backend .env file exists" -ForegroundColor Green
    $envContent = Get-Content "backend\.env" -Raw
    if ($envContent -match "DATABASE_URL") {
        Write-Host "[OK] DATABASE_URL configured" -ForegroundColor Green
    }
}
else {
    Write-Host "[WARN] Backend .env file not found" -ForegroundColor Yellow
    Write-Host "       Creating from .env.example..." -ForegroundColor Yellow
    if (Test-Path "backend\.env.example") {
        Copy-Item "backend\.env.example" "backend\.env"
        Write-Host "[OK] Created backend\.env" -ForegroundColor Green
    }
}

# Summary and Next Steps
Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "NEXT STEPS" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

$step = 1

if (-not $backendNodeModules -or -not $frontendNodeModules) {
    Write-Host "Step $step. Install dependencies:" -ForegroundColor Yellow
    if (-not $backendNodeModules) {
        Write-Host "        cd backend" -ForegroundColor White
        Write-Host "        npm install" -ForegroundColor White
    }
    if (-not $frontendNodeModules) {
        Write-Host "        cd frontend" -ForegroundColor White
        Write-Host "        npm install" -ForegroundColor White
    }
    Write-Host ""
    $step++
}

if ($pgRunning) {
    Write-Host "Step $step. Set up database:" -ForegroundColor Yellow
    Write-Host "        cd backend" -ForegroundColor White
    Write-Host "        npx prisma migrate dev --name init" -ForegroundColor White
    Write-Host "        npx prisma db seed" -ForegroundColor White
    Write-Host ""
    $step++
}
else {
    Write-Host "Step $step. Install and start PostgreSQL:" -ForegroundColor Yellow
    Write-Host "        See DATABASE_SETUP.md for instructions" -ForegroundColor White
    Write-Host ""
    $step++
}

Write-Host "Step $step. Start development servers:" -ForegroundColor Yellow
Write-Host "        Terminal 1: cd backend; npm run dev" -ForegroundColor White
Write-Host "        Terminal 2: cd frontend; npm run dev" -ForegroundColor White
Write-Host ""
$step++

Write-Host "Step $step. Test the application:" -ForegroundColor Yellow
Write-Host "        Open: http://localhost:3000" -ForegroundColor White
Write-Host "        Login: sarah@example.com / password123" -ForegroundColor White
Write-Host ""

Write-Host "================================================" -ForegroundColor Cyan
Write-Host "DOCUMENTATION" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "  README.md - Overview and quick start" -ForegroundColor White
Write-Host "  DATABASE_SETUP.md - Database installation" -ForegroundColor White
Write-Host "  TEST_ACCOUNTS.md - Test credentials and mock data" -ForegroundColor White
Write-Host ""
Write-Host "Ready to build sustainable solutions!" -ForegroundColor Green
Write-Host ""

