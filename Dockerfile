FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build

WORKDIR /src

COPY bankingonaspdotnet/Api.csproj bankingonaspdotnet/
RUN dotnet restore bankingonaspdotnet/Api.csproj

COPY bankingonaspdotnet/ bankingonaspdotnet/

RUN dotnet publish bankingonaspdotnet/Api.csproj \
    -c Release \
    -o /app/publish \
    /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS final

WORKDIR /app

COPY --from=build /app/publish .

ENTRYPOINT ["dotnet", "Api.dll"]