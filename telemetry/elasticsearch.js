const elasticsearch = require('@elastic/elasticsearch');

const client = new elasticsearch.Client({node:`http://192.168.99.100:9200`});

module.exports.run = async function run (bodyObj,indexName) {
    await client.index({
      index: indexName,
      body:bodyObj
      });
        
    await client.indices.refresh({ index: indexName });
    console.log('Kafka message written to Elasticsearch successfully. Index name : ',indexName);
}

/*
    let   {body}= await client.search({
        index: 'posts',
        body: {
          query: {
            match: { post_id: '1' }
          }
        }
      })
     
      console.log(body.hits.hits)
*/