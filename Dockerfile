FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build

WORKDIR /src

COPY treasuryonaspdotnet/Api.csproj treasuryonaspdotnet/
RUN dotnet restore treasuryonaspdotnet/Api.csproj

COPY treasuryonaspdotnet/ treasuryonaspdotnet/

RUN dotnet publish treasuryonaspdotnet/Api.csproj \
    -c Release \
    -o /app/publish \
    /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS final

WORKDIR /app

COPY --from=build /app/publish .

ENTRYPOINT ["dotnet", "Api.dll"]