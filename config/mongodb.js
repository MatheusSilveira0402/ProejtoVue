const colors = require('colors');
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/knowledge_stats', { useNewUrlParser: true })
    .then(e => {
        console.log('Tudo certo com mongodb'.green)
    })
    .catch(e =>  {
            const msg = 'ERRO! Na função de connectar com o MongoDB! '
            console.log(msg.red)
    })
    
