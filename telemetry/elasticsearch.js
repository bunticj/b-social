const elasticsearch = require('@elastic/elasticsearch');

const client = new elasticsearch.Client({node:`http://${process.env.LOCAL_IP}:9200`});

module.exports.run = async function run (bodyObj,indexName) {
    await client.index({
      index: indexName,
      body:bodyObj
      });
        
    await client.indices.refresh({ index: indexName });
    console.log('Kafka message written to Elasticsearch successfully. Index name : ',indexName);
}

