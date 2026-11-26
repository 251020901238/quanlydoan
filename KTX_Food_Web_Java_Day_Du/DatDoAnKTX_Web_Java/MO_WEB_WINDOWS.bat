@echo off
chcp 65001 > nul
cd /d "%~dp0"
echo Dang bien dich Java...
if not exist out mkdir out
(for /r src %%f in (*.java) do @echo "%%f") > sources.txt
javac -encoding UTF-8 -d out @sources.txt
if errorlevel 1 (echo Loi bien dich. Kiem tra cai dat JDK. & pause & exit /b 1)
start "" "http://localhost:8080"
echo Web dang chay tai http://localhost:8080
echo Bam Ctrl+C de dung.
java -cp out main.Main
pause
