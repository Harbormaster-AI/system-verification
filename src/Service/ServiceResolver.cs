using System;
using Microsoft.Extensions.DependencyInjection;

public class ServiceResolver : IServiceResolver
{
    private readonly IServiceProvider serviceProvider;

    public ServiceResolver(IServiceProvider serviceProvider)
    {
        this.serviceProvider = serviceProvider;
    }

    public T Get<T>()
    {
        return serviceProvider.GetRequiredService<T>();
    }
}