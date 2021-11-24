/**
 * ETL Pipeline
 * API - Jsonplaceholder API
 */
const fs = require('fs')
const rp = require('request-promise')

const requestOptions = {
    url: 'https://jsonplaceholder.typicode.com/posts',
    method: 'GET',
    json: true
}
//Run Pipeline
async function startETLPipeline(){
    //Extract data
    try {
    const postsData = await rp(requestOptions)
    console.log(`Found ${postsData.length} entries`);
    //Transform Data
    const transformedData = await postsData.map((item) => {
        return {
            myId: item.userId,
            postId: item.id,
            postTitle: item.title
        }
    })
    console.log('Transformed Data:', transformedData)
    //Load Data -> Json file
    fs.writeFile(`${__dirname}/posts.json`, JSON.stringify(transformedData,null,2),(err) =>{
        if(!err){
            console.log('File Created')
        }else{
            console.log('Aw snap!');
        }
    })

    } catch (error) {
        console.log(error)
    }

}


startETLPipeline()