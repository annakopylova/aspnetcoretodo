using ASPNetCoreApp.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
namespace ASPNetCoreApp.Controllers
{
    [Route("api/do")]
    [ApiController]
    public class DoController : ControllerBase
    {
        private readonly DoContext _context;
        public DoController(DoContext context)
        {
            _context = context;
            if (_context.Do.Count() == 0)
            {
                _context.Do.Add(new Do
                {
                    Url = "http:\\todo.net"
                });
                _context.SaveChanges();
            }
        }
        
       
        [HttpGet]//метод получения элементов дела
        public IEnumerable<Do> GetAll()
        {
            return _context.Do.Include(t => t.Task);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetDo([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var Do = await _context.Do.SingleOrDefaultAsync(m => m.DoId == id);

            if (Do == null)
            {
                return NotFound();
            }

            return Ok(Do);
        }
        [HttpPost]//создание дела
        public async Task<IActionResult> Create([FromBody] Do Do)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Do.Add(Do);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDo", new { id = Do.DoId }, Do);
        }
        [HttpPut("{id}")]//обновление
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] Do Do)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var item = _context.Do.Find(id);
            if (item == null)
            {
                return NotFound();
            }
            item.Url = Do.Url;
            item.Status = Do.Status;
            _context.Do.Update(item);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]//удаление
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var item = _context.Do.Find(id);
            if (item == null)
            {
                return NotFound();
            }
            _context.Do.Remove(item);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
