using Microsoft.EntityFrameworkCore;

namespace To_do_List.Server.Configuracao
{
    public class Contexto : DbContext
    {
        public Contexto(DbContextOptions<Contexto> options) : base(options)
        {
            Database.EnsureCreated();
        }

        public DbSet<Tarefa> Tarefa { get; set; }
    }
}
