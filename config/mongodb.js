const colors = require('colors');
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/knowledge_stats', { useNewUrlParser: true })
    .then(e => {
        console.log('Tudo certo com mongodb'.red)
    })
    .catch(e =>  {
            const msg = 'ERRO! Não foi possivel connectar com o MongoDB!'
            console.log(msg.red)
    })
    
