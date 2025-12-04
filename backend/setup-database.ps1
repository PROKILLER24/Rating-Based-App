# Database Setup Script for Rating App
Write-Host "`n=== Database Setup for Rating App ===" -ForegroundColor Cyan
Write-Host ""

# Check if PostgreSQL is running
$pgService = Get-Service -Name "*postgresql*" -ErrorAction SilentlyContinue | Where-Object { $_.Status -eq 'Running' } | Select-Object -First 1

if (-not $pgService) {
    Write-Host "❌ PostgreSQL service is not running!" -ForegroundColor Red
    Write-Host "Please start PostgreSQL service first." -ForegroundColor Yellow
    exit 1
}

Write-Host "✓ PostgreSQL service is running: $($pgService.Name)" -ForegroundColor Green
Write-Host ""

# Get PostgreSQL connection details
Write-Host "Please provide your PostgreSQL connection details:" -ForegroundColor Yellow
Write-Host ""

$dbUser = Read-Host "Database Username (default: postgres)"
if ([string]::IsNullOrWhiteSpace($dbUser)) { $dbUser = "postgres" }

$dbPassword = Read-Host "Database Password" -AsSecureString
$dbPasswordPlain = [Runtime.InteropServices.Marshal]::PtrToStringAuto(
    [Runtime.InteropServices.Marshal]::SecureStringToBSTR($dbPassword)
)

$dbPort = Read-Host "Database Port (default: 5432)"
if ([string]::IsNullOrWhiteSpace($dbPort)) { $dbPort = "5432" }

Write-Host ""
Write-Host "Testing connection..." -ForegroundColor Yellow

# Test connection
$env:PGPASSWORD = $dbPasswordPlain
$testResult = psql -U $dbUser -h localhost -p $dbPort -c "SELECT version();" 2>&1

if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Connection successful!" -ForegroundColor Green
    Write-Host ""
    
    # Check if database exists
    Write-Host "Checking if database 'rating_app' exists..." -ForegroundColor Yellow
    $dbExists = psql -U $dbUser -h localhost -p $dbPort -lqt 2>&1 | Select-String "rating_app"
    
    if ($dbExists) {
        Write-Host "✓ Database 'rating_app' already exists" -ForegroundColor Green
    } else {
        Write-Host "Creating database 'rating_app'..." -ForegroundColor Yellow
        psql -U $dbUser -h localhost -p $dbPort -c "CREATE DATABASE rating_app;" 2>&1 | Out-Null
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✓ Database 'rating_app' created successfully" -ForegroundColor Green
        } else {
            Write-Host "❌ Failed to create database" -ForegroundColor Red
            exit 1
        }
    }
    
    # Update .env file
    Write-Host ""
    Write-Host "Updating .env file..." -ForegroundColor Yellow
    
    $databaseUrl = "postgresql://${dbUser}:${dbPasswordPlain}@localhost:${dbPort}/rating_app?schema=public"
    
    $envContent = @"
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
DATABASE_URL=$databaseUrl
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d
"@
    
    $envContent | Out-File -FilePath ".env" -Encoding utf8 -NoNewline
    Write-Host "✓ .env file updated with database credentials" -ForegroundColor Green
    
    Write-Host ""
    Write-Host "=== Setup Complete! ===" -ForegroundColor Green
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Cyan
    Write-Host "1. Run: npx prisma migrate dev" -ForegroundColor White
    Write-Host "2. Run: npm run dev" -ForegroundColor White
    Write-Host ""
    
} else {
    Write-Host "❌ Connection failed!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Error details:" -ForegroundColor Yellow
    Write-Host $testResult -ForegroundColor Red
    Write-Host ""
    Write-Host "Please check:" -ForegroundColor Yellow
    Write-Host "- Username is correct" -ForegroundColor White
    Write-Host "- Password is correct" -ForegroundColor White
    Write-Host "- PostgreSQL is running on port $dbPort" -ForegroundColor White
    Write-Host ""
    Write-Host "Common solutions:" -ForegroundColor Yellow
    Write-Host "1. Try using 'postgres' as username with your PostgreSQL installation password" -ForegroundColor White
    Write-Host "2. Check pg_hba.conf file for authentication settings" -ForegroundColor White
    Write-Host "3. Try using Windows authentication if configured" -ForegroundColor White
}

# Clear password from environment
$env:PGPASSWORD = ""


