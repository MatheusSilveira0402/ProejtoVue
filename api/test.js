module.exports = app => {

    const get = (req, res) => {
      res.send('teste')
    }

    return { get }
}

