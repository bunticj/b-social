const kafka = require('kafka-node');
const run = require('./elasticsearch').run;

try {
    const client = new kafka.KafkaClient({
        kafkaHost:'192.168.99.100:9092'
    });
    let offset = new kafka.Offset(client);

    let consumer = new kafka.Consumer(
        client,
        [{
                topic: 'CommentTopic',
                partition: 0,
                offset: offset
            }, {
                topic: 'PostTopic',
                partition: 0,
                offset: offset
            },
            {
                topic: 'UserRegisterTopic',
                partition: 0,
                offset: offset
            }
        ], {
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

    let userRegBody = {},
        postBody = {},
        commentBody = {};

    consumer.on('message', async function (message) {

        if (message.topic === 'UserRegisterTopic') {
            userRegBody[message.key] = message.value;
            if (message.key === 'date_of_registration') {
                run(userRegBody, 'registrations').catch(e => console.log(e));
            }
        }

        if (message.topic === 'PostTopic') {
            postBody[message.key] = message.value;
            if (message.key === 'post_created_at') {
                run(postBody, 'posts').catch(e => console.log(e));
            }
        }
        if (message.topic === 'CommentTopic') {
            commentBody[message.key] = message.value;
            if (message.key === 'comment_created_at') {
                run(commentBody, 'comments').catch(e => console.log(e));
            }
        }
    })
    consumer.on('error', function (err) {
        console.log('error', err);
    });
} catch (e) {
    console.log(e);
}