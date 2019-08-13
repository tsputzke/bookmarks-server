const ArticlesService = {
  getAllBookmarks(knex) {
    // return knex.select('*').from('bookmarks')
    return 'all the articles!!'
  },
  // insertArticle(knex, newArticle) {
  //   return knex 
  //     .insert(newArticle)
  //     .into('bookmarks')
  //     .returning('*')
  //     .then(rows => {
  //       return rows[0]
  //     })
  // },
  // getById(knex, id) {
  //   return knex.from('bookmarks').select('*').where('id', id).first()
  // },
  // deleteArticle(knex, id) {
  //   return knex('bookmarks')
  //     .where({ id })
  //     .delete()
  // },
  // updateArticle(knex, id, newArticleFields) {
  //   return knex('bookmarks')
  //     .where({ id })
  //     .update(newArticleFields)
  // },
}

module.exports = ArticlesService
