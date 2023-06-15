using System;
using System.Linq.Expressions;
using MatchFixture.Data;
using MatchFixture.Interfaces;
using MatchFixture.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace MatchFixture.Repositories
{
    public class RepositoryBase<T> : IRepositoryBase<T>
            where T : class, IEntityBase, new()
    {
        public MatchFixtureDbContext _context;

        public RepositoryBase(MatchFixtureDbContext context)
        {
            _context = context;
        }
        public virtual IEnumerable<T> GetAll()
        {
            return _context.Set<T>().Where(x => x.IsDeleted != true).AsEnumerable();
        }
        public T GetSingle(int id)
        {
            return _context.Set<T>().FirstOrDefault(x => x.Id == id && x.IsDeleted != true);
        }

        public virtual IEnumerable<T> Where(Expression<Func<T, bool>> predicate)
        {
            return _context.Set<T>().Where(predicate);
        }
        public virtual void Add(T entity)
        {
            entity.CreatedOn = DateTime.UtcNow;
            entity.IsDeleted = false;
            EntityEntry dbEntityEntry = _context.Entry<T>(entity);
            _context.Set<T>().Add(entity);
        }

        public virtual void Update(T entity)
        {
            entity.ModifiedOn = DateTime.UtcNow;
            EntityEntry dbEntityEntry = _context.Entry<T>(entity);
            dbEntityEntry.State = EntityState.Modified;
        }

        public virtual void Delete(T entity)
        {
            entity.IsDeleted = true;
            entity.DeletedOn = DateTime.UtcNow;
            EntityEntry dbEntityEntry = _context.Entry<T>(entity);
            dbEntityEntry.State = EntityState.Modified;
        }
        public virtual void Commit()
        {
            _context.SaveChanges();
        }
    }
}

