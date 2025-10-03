# Script Helper para Lighthouse Audit
# Execute este arquivo no PowerShell para gerar relatórios automaticamente

Write-Host "🚀 DR Infantil - Lighthouse Audit Helper" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Verificar se o servidor está rodando
Write-Host "⏳ Verificando se o servidor está rodando..." -ForegroundColor Yellow
$serverRunning = $false

try {
    $response = Invoke-WebRequest -Uri "http://localhost:5173/" -UseBasicParsing -TimeoutSec 2 -ErrorAction SilentlyContinue
    if ($response.StatusCode -eq 200) {
        $serverRunning = $true
        Write-Host "✅ Servidor rodando em http://localhost:5173/" -ForegroundColor Green
    }
} catch {
    Write-Host "❌ Servidor não está rodando!" -ForegroundColor Red
    Write-Host "   Execute 'npm run dev' antes de continuar" -ForegroundColor Yellow
    Write-Host ""
    exit 1
}

Write-Host ""

# Verificar se Lighthouse está instalado
Write-Host "⏳ Verificando instalação do Lighthouse..." -ForegroundColor Yellow
$lighthouseInstalled = $false

try {
    $lighthouseVersion = lighthouse --version 2>$null
    if ($LASTEXITCODE -eq 0) {
        $lighthouseInstalled = $true
        Write-Host "✅ Lighthouse instalado: $lighthouseVersion" -ForegroundColor Green
    }
} catch {
    Write-Host "⚠️  Lighthouse CLI não instalado" -ForegroundColor Yellow
    Write-Host "   Você pode usar o Chrome DevTools em vez disso (F12 → Lighthouse)" -ForegroundColor Cyan
    Write-Host ""
    
    $install = Read-Host "Deseja instalar Lighthouse CLI agora? (s/n)"
    if ($install -eq "s" -or $install -eq "S") {
        Write-Host "📦 Instalando Lighthouse..." -ForegroundColor Yellow
        npm install -g lighthouse
        Write-Host "✅ Lighthouse instalado!" -ForegroundColor Green
        $lighthouseInstalled = $true
    } else {
        Write-Host "❌ Continuando sem Lighthouse CLI" -ForegroundColor Red
        Write-Host "   Use o Chrome DevTools para fazer o audit manualmente" -ForegroundColor Cyan
        Write-Host ""
        exit 0
    }
}

Write-Host ""

# Menu de opções
Write-Host "📋 Escolha uma opção:" -ForegroundColor Cyan
Write-Host "1. Auditar Home Page" -ForegroundColor White
Write-Host "2. Auditar Quiz" -ForegroundColor White
Write-Host "3. Auditar Memory Game" -ForegroundColor White
Write-Host "4. Auditar Hangman Game" -ForegroundColor White
Write-Host "5. Auditar Puzzle Game" -ForegroundColor White
Write-Host "6. Auditar Coloring Game" -ForegroundColor White
Write-Host "7. Auditar TODAS as páginas" -ForegroundColor Yellow
Write-Host "8. Abrir Chrome DevTools (manual)" -ForegroundColor Cyan
Write-Host "0. Sair" -ForegroundColor Red
Write-Host ""

$option = Read-Host "Digite o número da opção"

# Criar diretório para relatórios
$reportsDir = "lighthouse-reports"
if (-not (Test-Path $reportsDir)) {
    New-Item -ItemType Directory -Path $reportsDir | Out-Null
    Write-Host "📁 Criado diretório: $reportsDir" -ForegroundColor Green
}

# Função para executar audit
function Run-Audit {
    param(
        [string]$url,
        [string]$name
    )
    
    Write-Host ""
    Write-Host "🔍 Auditando: $name" -ForegroundColor Cyan
    Write-Host "   URL: $url" -ForegroundColor Gray
    
    $timestamp = Get-Date -Format "yyyy-MM-dd_HH-mm-ss"
    $filename = "$reportsDir/${name}_${timestamp}.html"
    
    try {
        lighthouse $url `
            --only-categories=accessibility `
            --output=html `
            --output-path=$filename `
            --quiet
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✅ Audit completo: $filename" -ForegroundColor Green
            
            # Abrir relatório no navegador
            $open = Read-Host "Deseja abrir o relatório? (s/n)"
            if ($open -eq "s" -or $open -eq "S") {
                Start-Process $filename
            }
        } else {
            Write-Host "❌ Erro ao executar audit" -ForegroundColor Red
        }
    } catch {
        Write-Host "❌ Erro: $_" -ForegroundColor Red
    }
}

# Executar audit baseado na opção
switch ($option) {
    "1" {
        Run-Audit "http://localhost:5173/" "home"
    }
    "2" {
        Write-Host "⚠️  Navegue manualmente para o Quiz e execute:" -ForegroundColor Yellow
        Write-Host "   lighthouse http://localhost:5173/#quiz --only-categories=accessibility --view" -ForegroundColor Cyan
    }
    "3" {
        Write-Host "⚠️  Navegue manualmente para o Memory Game e execute:" -ForegroundColor Yellow
        Write-Host "   lighthouse http://localhost:5173/#memory --only-categories=accessibility --view" -ForegroundColor Cyan
    }
    "4" {
        Write-Host "⚠️  Navegue manualmente para o Hangman e execute:" -ForegroundColor Yellow
        Write-Host "   lighthouse http://localhost:5173/#hangman --only-categories=accessibility --view" -ForegroundColor Cyan
    }
    "5" {
        Write-Host "⚠️  Navegue manualmente para o Puzzle e execute:" -ForegroundColor Yellow
        Write-Host "   lighthouse http://localhost:5173/#puzzle --only-categories=accessibility --view" -ForegroundColor Cyan
    }
    "6" {
        Write-Host "⚠️  Navegue manualmente para o Coloring e execute:" -ForegroundColor Yellow
        Write-Host "   lighthouse http://localhost:5173/#coloring --only-categories=accessibility --view" -ForegroundColor Cyan
    }
    "7" {
        Write-Host "🚀 Executando audit em todas as páginas..." -ForegroundColor Cyan
        Run-Audit "http://localhost:5173/" "home"
        Write-Host ""
        Write-Host "⚠️  Para auditar os jogos, navegue manualmente para cada um e execute o Lighthouse" -ForegroundColor Yellow
        Write-Host "   (SPAs com rotas client-side requerem navegação manual)" -ForegroundColor Gray
    }
    "8" {
        Write-Host "🌐 Abrindo Chrome com DevTools..." -ForegroundColor Cyan
        Write-Host ""
        Write-Host "📋 Instruções:" -ForegroundColor Yellow
        Write-Host "   1. Pressione F12 para abrir DevTools" -ForegroundColor White
        Write-Host "   2. Clique na aba 'Lighthouse'" -ForegroundColor White
        Write-Host "   3. Marque apenas 'Accessibility'" -ForegroundColor White
        Write-Host "   4. Clique em 'Analyze page load'" -ForegroundColor White
        Write-Host ""
        Start-Process "chrome" "http://localhost:5173/"
    }
    "0" {
        Write-Host "👋 Até logo!" -ForegroundColor Cyan
        exit 0
    }
    default {
        Write-Host "❌ Opção inválida!" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "✅ Concluído!" -ForegroundColor Green
Write-Host ""
