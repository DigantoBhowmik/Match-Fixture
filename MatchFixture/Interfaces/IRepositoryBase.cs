using System;
using MatchFixture.Models;

namespace MatchFixture.Interfaces
{
	public interface IRepositoryBase<T> where T : class, IEntityBase, new()
    {
        IEnumerable<T> GetAll();
        T GetSingle(int id);
        void Add(T entity);
        void Update(T entity);
        void Delete(T entity);
        void Commit();
    }
}

