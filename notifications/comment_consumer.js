const kafka = require('kafka-node');
const sendRequest = require('./send_notification').sendRequest;
try {
  const client = new kafka.KafkaClient({kafkaHost: '192.168.99.100:9092'});  
  let offset = new kafka.Offset(client);

  offset.fetch([{ topic: 'CommentTopic', partition: 0, time: -1, }],  (err, data) => {
  if (err) throw err;
       console.log('Latest offset ', data['CommentTopic']['0'][0]);
});
  let consumer = new kafka.Consumer(
    client,
    [ {topic: 'CommentTopic', partition:0, offset: offset}],
    {
      autoCommit: true,
      fetchMaxWaitMs: 1000,
      fetchMaxBytes: 1024 * 1024,
      encoding: 'utf8', 
      fromOffset: true
      
    }
  );
  consumer.on('ready', async function () {
        console.log('consumer ready');

  });
const messageObj = {};
let counter = 0;

  consumer.on('message', async function(message) {

    console.log('Kafka message =>',message);
        messageObj[message.key] = message.value;
        if(message.key === 'comment_created_at' ){
         sendRequest(messageObj);     
        }
  })
  consumer.on('error', function(err) {
    console.log('error', err);
  });
}
catch(e) {
  console.log(e);
}

