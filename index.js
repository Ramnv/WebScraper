const PORT = 8000
const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())

// const url = 'http://www.ifsul.edu.br/'
// const url = 'https://musicforprogramming.net/latest/'
const url = 'https://www.theguardian.com/uk'

app.get('/results', (req, res) => {
    axios(url)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)
            const articles = []

            $('.fc-item__title', html).each(function () {
                const title = $(this).text()
                const url = $(this).find('a').attr('href')
                articles.push({
                    title
                })
            })
            res.json(articles)
        }).catch(err => console.log(err))

})

// app.get('/results', (req, res) => {
//     axios(url)
//         .then(response => {
//             const html = response.data
//             const $ = cheerio.load(html)
//             const articles = []

//             $('.fc-item__title', html).each(function () { //<-- cannot be a function expression
//                 const title = $(this).text()
//                 const url = $(this).find('a').attr('href')
//                 articles.push({
//                     title,
//                     url
//                 })
//             })
//             res.json(articles)
//         }).catch(err => console.log(err))

// })


app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))

