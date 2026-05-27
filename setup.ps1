# EcoSwap Quick Start Script for Windows
Write-Host "🌱 EcoSwap Setup Script" -ForegroundColor Green
Write-Host "======================" -ForegroundColor Green
Write-Host ""

# Check if Node.js is installed
Write-Host "Checking Node.js installation..." -ForegroundColor Cyan
try {
    $nodeVersion = node --version
    Write-Host "✓ Node.js $nodeVersion found" -ForegroundColor Green
} catch {
    Write-Host "✗ Node.js not found. Please install Node.js from https://nodejs.org" -ForegroundColor Red
    exit 1
}

# Check if npm is installed
Write-Host "Checking npm installation..." -ForegroundColor Cyan
try {
    $npmVersion = npm --version
    Write-Host "✓ npm $npmVersion found" -ForegroundColor Green
} catch {
    Write-Host "✗ npm not found" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Step 1: Installing Backend Dependencies" -ForegroundColor Yellow
Write-Host "=======================================" -ForegroundColor Yellow
Set-Location backend

if (!(Test-Path "node_modules")) {
    npm install
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ Backend dependencies installed" -ForegroundColor Green
    } else {
        Write-Host "✗ Backend dependency installation failed" -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "✓ Backend dependencies already installed" -ForegroundColor Green
}

Write-Host ""
Write-Host "Step 2: Installing Frontend Dependencies" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Yellow
Set-Location ..\frontend

if (!(Test-Path "node_modules")) {
    npm install
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ Frontend dependencies installed" -ForegroundColor Green
    } else {
        Write-Host "✗ Frontend dependency installation failed" -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "✓ Frontend dependencies already installed" -ForegroundColor Green
}

Set-Location ..

Write-Host ""
Write-Host "Step 3: Database Setup" -ForegroundColor Yellow
Write-Host "=====================" -ForegroundColor Yellow
Write-Host ""
Write-Host "⚠️  Before proceeding, ensure PostgreSQL is running!" -ForegroundColor Yellow
Write-Host ""
Write-Host "Options:" -ForegroundColor Cyan
Write-Host "  1. Local PostgreSQL - Ensure it's running on localhost:5432"
Write-Host "  2. Docker PostgreSQL - Run: docker run --name ecoswap-db -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=ecoswap -p 5432:5432 -d postgres"
Write-Host ""

$continue = Read-Host "Is PostgreSQL running? (y/n)"

if ($continue -eq "y" -or $continue -eq "Y") {
    Write-Host ""
    Write-Host "Generating Prisma Client..." -ForegroundColor Cyan
    Set-Location backend
    npx prisma generate
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ Prisma Client generated" -ForegroundColor Green
        
        Write-Host ""
        Write-Host "Running database migrations..." -ForegroundColor Cyan
        npx prisma migrate dev --name init
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✓ Database migrations completed" -ForegroundColor Green
        } else {
            Write-Host "✗ Database migration failed" -ForegroundColor Red
            Write-Host "Please check your DATABASE_URL in backend/.env" -ForegroundColor Yellow
        }
    }
    
    Set-Location ..
} else {
    Write-Host "⚠️  Skipping database setup. Run 'npx prisma migrate dev' in the backend folder when ready." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "✓ Setup Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Start Backend (Terminal 1):" -ForegroundColor White
Write-Host "   cd backend"
Write-Host "   npm run dev"
Write-Host ""
Write-Host "2. Start Frontend (Terminal 2):" -ForegroundColor White
Write-Host "   cd frontend"
Write-Host "   npm run dev"
Write-Host ""
Write-Host "3. Open your browser:" -ForegroundColor White
Write-Host "   http://localhost:3000"
Write-Host ""
Write-Host "Happy coding! 🚀" -ForegroundColor Green
