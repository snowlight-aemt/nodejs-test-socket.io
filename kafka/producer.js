const { Kafka } = require('kafkajs')

const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['localhost:19092', 'localhost:29092', 'localhost:39092'],
});

const producer = kafka.producer({
    allowAutoTopicCreation: false,
});

const TOPIC = 'test-topic';
const TOPIC_1 = 'test-topic-1';

const run = async () => {
    console.log("send");
    await producer.connect();
    setInterval(() => {
        console.log('<<< START');
        producer.send({
            topic: TOPIC,
            messages: [
                // { key: '1234', value: '1 Hello KafkaJS user!' },
                // { key: '5678', value: '2 Hello KafkaJS user!' },
                { value: 'test-topic 1 Hello KafkaJS user!' },
                { value: 'test-topis 2 Hello KafkaJS user!' },
            ],
        });
        console.log('>>> END');
    }, 500);
    setInterval(() => {
        producer.send({
            topic: TOPIC_1,
            messages: [
                // { key: '1234', value: '1 Hello KafkaJS user!' },
                // { key: '5678', value: '2 Hello KafkaJS user!' },
                { value: 'test-topic-1 1 Hello KafkaJS user!' },
                { value: 'test-topic-1 2 Hello KafkaJS user!' },
            ],
        });
    }, 1000);
}

run()
    .catch(e => console.error("err"));
    // .finally( async () => await producer.disconnect());

    // await producer.disconnect()

