using System;
using System.Linq.Expressions;
using MatchFixture.Models;

namespace MatchFixture.Interfaces
{
    public interface IRepositoryBase<T> where T : class, IEntityBase, new()
    {
        IEnumerable<T> GetAll();
        T GetSingle(int id);
        IEnumerable<T> Where(Expression<Func<T, bool>> predicate);
        void Add(T entity);
        void Update(T entity);
        void Delete(T entity);
        void Commit();
    }
}

