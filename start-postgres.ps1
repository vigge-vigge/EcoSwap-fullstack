# Start PostgreSQL Service Script
# Run this script as Administrator

Write-Host "Starting PostgreSQL service..." -ForegroundColor Yellow

try {
    Start-Service postgresql-x64-17 -ErrorAction Stop
    Write-Host "✓ PostgreSQL service started successfully!" -ForegroundColor Green
    
    # Verify service is running
    $service = Get-Service postgresql-x64-17
    Write-Host "Service Status: $($service.Status)" -ForegroundColor Cyan
    
    # Wait a moment for the service to fully initialize
    Start-Sleep -Seconds 2
    
    Write-Host "`nPostgreSQL is now running on localhost:5432" -ForegroundColor Green
    Write-Host "`nNext steps:" -ForegroundColor Yellow
    Write-Host "1. Open a new PowerShell window (not as admin)" -ForegroundColor White
    Write-Host "2. Run: cd c:\code\ecoswap\backend" -ForegroundColor White
    Write-Host "3. Run: npx prisma db push" -ForegroundColor White
    Write-Host "4. Run: npx prisma db seed" -ForegroundColor White
    Write-Host "5. Restart your backend server if it's running" -ForegroundColor White
    
} catch {
    Write-Host "✗ Failed to start PostgreSQL service" -ForegroundColor Red
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "`nMake sure you are running PowerShell as Administrator!" -ForegroundColor Yellow
    Write-Host "Right-click PowerShell and select 'Run as Administrator'" -ForegroundColor Yellow
}

Read-Host "`nPress Enter to exit"
