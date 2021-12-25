
module.exports = app => {
    const Stat = app.mongoose.model('Stat', {
        users: String,
        categories: String,
        articles: String,
        createAt: Date
    })

    const get = (req, res) => {
        Stat.findOne({}, {}, {sort: {'createAt': -1} })
            .then(stat => {
                const defaultStat = {
                    users: 0,
                    categories: 0,
                    articles: 0,
                }
                res.json(stat || defaultStat)
            })
            .catch(err => {res.status(500).send(err), console.log(err, 'Erro na função de puxa estatisticas do mongodb'.red)} )
    }

    return { Stat, get }
}