using BackEndAPI.Models;

namespace BackEndAPI.Services.Contrato
{
    public interface IDepartamentoService
    {
        Task<List<Departamento>> GetList();
    }
}
