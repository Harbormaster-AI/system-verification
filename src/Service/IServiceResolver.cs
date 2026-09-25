namespace bankingonaspdotnet.Service;

public interface IServiceResolver
{
    T Get<T>();
}