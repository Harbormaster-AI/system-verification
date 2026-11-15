FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build

WORKDIR /src

COPY demo/Api.csproj demo/
RUN dotnet restore demo/Api.csproj

COPY demo/ demo/

RUN dotnet publish demo/Api.csproj \
    -c Release \
    -o /app/publish \
    /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS final

WORKDIR /app

COPY --from=build /app/publish .

ENTRYPOINT ["dotnet", "Api.dll"]