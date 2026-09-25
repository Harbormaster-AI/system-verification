FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build

WORKDIR /src

COPY inventoryonaspdotnet/Api.csproj inventoryonaspdotnet/
RUN dotnet restore inventoryonaspdotnet/Api.csproj

COPY inventoryonaspdotnet/ inventoryonaspdotnet/

RUN dotnet publish inventoryonaspdotnet/Api.csproj \
    -c Release \
    -o /app/publish \
    /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS final

WORKDIR /app

COPY --from=build /app/publish .

ENTRYPOINT ["dotnet", "Api.dll"]