@REM ----------------------------------------------------------------------------
@REM Maven Wrapper startup batch script (Windows)
@REM This script auto-downloads Maven if not found, then runs your Maven command.
@REM ----------------------------------------------------------------------------
@IF "%__MVNW_ARG0_NAME__%"=="" (SET __MVNW_ARG0_NAME__=%~nx0)
@SET @@FAIL_FAST=
@SET @@CMD_LINE_ARGS=
@SET MAVEN_PROJECTBASEDIR=%~dp0
@SET MAVEN_PROJECTBASEDIR_NO_TRAIL=%MAVEN_PROJECTBASEDIR:~0,-1%

@IF NOT "%MAVEN_WRAPPER_JAR%" == "" GOTO chkJarDownloaded
@SET MAVEN_WRAPPER_JAR=%MAVEN_PROJECTBASEDIR%\.mvn\wrapper\maven-wrapper.jar

:downloadFromUrl
@SET DOWNLOAD_URL=https://repo.maven.apache.org/maven2/org/apache/maven/wrapper/maven-wrapper/3.2.0/maven-wrapper-3.2.0.jar
@ECHO Downloading Maven Wrapper...
@powershell -Command "& {Invoke-WebRequest -Uri '%DOWNLOAD_URL%' -OutFile '%MAVEN_WRAPPER_JAR%'}" 2>nul
@IF ERRORLEVEL 1 (
    @ECHO Could not download Maven Wrapper. Ensure internet access.
    @EXIT /B 1
)

:chkJarDownloaded
@SETLOCAL EnableExtensions EnableDelayedExpansion

@SET WRAPPER_LAUNCHER=org.apache.maven.wrapper.MavenWrapperMain

@SET DOWNLOAD_URL="https://repo.maven.apache.org/maven2/org/apache/maven/apache-maven/3.9.6/apache-maven-3.9.6-bin.zip"

@FOR /F "usebackq tokens=1,2 delims==" %%A IN ("%MAVEN_PROJECTBASEDIR%\.mvn\wrapper\maven-wrapper.properties") DO (
    @IF "%%A"=="distributionUrl" SET DISTRIBUTION_URL=%%B
)

@java -Dmaven.multiModuleProjectDirectory="%MAVEN_PROJECTBASEDIR_NO_TRAIL%" -cp "%MAVEN_WRAPPER_JAR%" %WRAPPER_LAUNCHER% %MAVEN_CONFIG% %*
@IF ERRORLEVEL 1 GOTO error
@GOTO end

:error
@SET ERROR_CODE=%ERRORLEVEL%

:end
@ENDLOCAL & SET ERROR_CODE=%ERROR_CODE%
@IF "%MVNW_VERBOSE%"=="true" @ECHO Finished with error code %ERROR_CODE%
@EXIT /B %ERROR_CODE%
