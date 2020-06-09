const kafka = require('kafka-node');

function produceMessage(payloads){

const HighLevelProducer = kafka.HighLevelProducer,
client = new kafka.KafkaClient({kafkaHost:process.env.LOCAL_IP+':9092'}),
producer = new HighLevelProducer(client);

        producer.on('ready', function () {
            producer.send(payloads, function (err, data) {
                console.log(`Message sent to kafka succesfully`)
                console.log(data);
            });
        });

    }

    module.exports.produceMessage = produceMessage;