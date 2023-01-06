Get-Item -Path '.\.bin\deno.exe' -ErrorAction SilentlyContinue -ErrorVariable denoError -OutVariable denoPath | Out-Null;

if ($denoError) {
    Write-Host 'Deno not found. Installing...';
    Expand-Archive -Path '.\.bin\deno-x86_64-pc-windows-msvc.zip' -DestinationPath '.\.bin';
    Write-Host 'Deno installed in .\.bin\deno.exe';
}

Write-Host 'Starting Deno...';

&'.\.bin\deno.exe' task start;