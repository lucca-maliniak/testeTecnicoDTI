using System.ComponentModel.DataAnnotations.Schema;

namespace To_do_List.Server
{
    [Table("Tarefa")]
    public class Tarefa
    {
        [Column("Id")]
        public int ?Id { get; set; }
        [Column("Name")]
        public string Name { get; set; }
        [Column("Date")]
        public string Date { get; set; }


        public Tarefa(string date, string name)
        {
            this.Date = date;
            this.Name = name;
        }
    }
}
