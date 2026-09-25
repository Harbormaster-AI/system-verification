FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build

WORKDIR /src

COPY crmonaspdotnet/Api.csproj crmonaspdotnet/
RUN dotnet restore crmonaspdotnet/Api.csproj

COPY crmonaspdotnet/ crmonaspdotnet/

RUN dotnet publish crmonaspdotnet/Api.csproj \
    -c Release \
    -o /app/publish \
    /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS final

WORKDIR /app

COPY --from=build /app/publish .

ENTRYPOINT ["dotnet", "Api.dll"]