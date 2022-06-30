const { Kafka } = require('kafkajs')

const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['localhost:19092', 'localhost:29092', 'localhost:39092'],
});

const consumer = kafka.consumer({ groupId: 'test-group-2' });

// const TOPIC = 'wingsexp5-machine';
// const TOPIC = 'dev.api.kiosk.node.three.json';
const TOPIC = 'dev.api.kiosk.node.three.json';

const run  = async () => {
    await consumer.connect();
    await consumer.subscribe({ topics: [TOPIC], fromBeginning: true });
    await consumer.run({
        eachMessage: async({ topic, partition, message }) => {
            console.log( "topic:" + topic );
            console.log( "partition:" + partition );
            console.log({ value: message.value});
            console.log({ value: message.value.toString()});
        },
    });
}

run().catch(e => console.error(`[]`, e));
