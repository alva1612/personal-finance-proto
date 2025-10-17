import { Kafka } from "kafkajs";
import { KAFKA_BROKERS } from "./environment";

export const kafka = new Kafka({
    clientId: 'finances-app',
    brokers: KAFKA_BROKERS
});