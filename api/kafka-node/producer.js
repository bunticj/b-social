const kafka = require('kafka-node');

function produceMessage(payloads){
    
const HighLevelProducer = kafka.HighLevelProducer,
client = new kafka.KafkaClient({kafkaHost: '192.168.99.100:9092'}),
producer = new HighLevelProducer(client);

    
        producer.on('ready', function () {
            producer.send(payloads, function (err, data) {
                console.log(payloads);
                console.log(data);
            });
        });

    }

    module.exports.produceMessage = produceMessage;