const colors = require('colors')
const queries = require('./queries')

module.exports = app => {

    const { existsOrError, notExistsOrError } = app.api.validation

    const save = (req, res) => { 
        const article = {...req.body}
        if(req.params.id) article.id = req.params.id
        try {
            existsOrError(article.name, 'Nome não informado')
            existsOrError(article.description, 'Descrição não informada')
            existsOrError(article.categoryId, 'Categoria não informada')
            existsOrError(article.userId, 'Autor não informado')
            existsOrError(article.content, 'Conteúdo não informado')
        } catch (msg) {
            res.status(400).send(msg),console.log(msg, 'Erro na função de salvar article'.red)
        }

        if(article.id) {
            app.db('articles')
                .update(article)
                .where({id:article.id})
                .then(() => res.status(204).send())
                .catch(err => {res.status(500).send(err), console.log(err, 'erro aconteceu na função de update'.red)}   )
        } else {
            app.db('articles')
                .insert(article)
                .then(() => res.status(204).send())
                .catch(err => {res.status(500).send(err), console.log(err, 'erro na função de inserir articles'.red)})
        }
    }
    const remove = async (req, res) => {
        try {
            const rowsDeleted = await app.db('articles')
                .where({id: req.params.id }).del()
            try {
                existsOrError(rowsDeleted, 'Artigo não for encontrado.') 
            } catch (msg) {
                return res.status(400).send(msg), console.log(msg, ' erro 400, na função de remover articles, OBS: Pode ser algo no front end '.red)
            }
            
            res.status(204).send() 
        } catch (msg) {
            res.status(500).send(msg), console.log(msg, 'erro na função de remover articles'.red)  
        }
    }
    
    const limit = 10 // usando para paginação
    
    const get = async (req, res) => {
        const page  = req.query.page || 1

        const result = await app.db('articles').count('id').first()
        const count = parseInt(result.count)

        app.db('articles')
            .select('id', 'name', 'description')
            .limit(limit).offset(page * limit -limit)
            .then(article => res.json({ data: article, count, limit }))
            .catch(err => {res.status(500).send(err), console.log(err, 'Erro na função de paginação'.red)})
    }

    const getById = (req, res) => {
        app.db('articles')
            .where({id: req.params.id})
            .first()
            .then(articles => {
                articles.content = articles.content.toString()
                return res.json(articles)
            })
            .catch(err => {res.status(500).send(err), console.log(err, 'erro na função do getByid'.red)})
    }

    const getByCategory = async (req, res) => {
        const categoryId = req.params.id
        const page = req.query.page || 1
        const categories = await app.db.raw(queries.categoryWithChildren, categoryId)
        const ids = categories.rows.map(c => c.id)
        
        app.db({a: 'articles', u: 'users'})
            .select('a.id', 'a.name', 'a.description', 'a.imageUrl', {author: 'u.name'})
            .limit(limit).offset(page * limit -limit)
            .whereRaw('?? = ??', ['u.id', 'a.userId'])
            .whereIn('categoryId', ids)
            .orderBy('a.id', 'desc')
            .then(articles => {res.json(articles)})
            .catch(err => {res.status(500).send(err), console.log(err, 'Erro na função de pegar os atigos de todas as categorias.'.red)})
    }
    
    return { save, remove, get, getById, getByCategory}
}