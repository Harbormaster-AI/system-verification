namespace demo.Service;

public interface IServiceResolver
{
    T Get<T>() where T : notnull;
}