class kafkaMsgClass {
    constructor( key, messages, topic, partition = 0) {
      this.topic = topic;
      this.key = key;
      this.messages = messages;
      this.partition = partition;
    }
  }


  module.exports = kafkaMsgClass;   