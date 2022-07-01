const { Kafka } = require('kafkajs');
require('dotenv').config();

const kafka = new Kafka({
    clientId: 'my-app',
    brokers: getBootstrapServers(),
});

const consumer = kafka.consumer({ groupId: process.env.GROUP_ID });

const run  = async (runner) => {
    await consumer.connect();
    await consumer.subscribe({ topics: getTopics(), fromBeginning: true });
    await consumer.run({
        eachMessage: async({ topic, partition, message }) => {
            console.log( "topic:" + topic );
            console.log( "partition:" + partition );

            console.log({ value: message.value});
            console.log({ value: message.value.toString()});

            runner({ topic, partition, message });
        },
    });
}

module.exports.run = run;

function getBootstrapServers() {
    return process.env.BOOTSTRAP_SERVER.split(',');
}

function getTopics() {
    return process.env.TOPIC.split(',');
}