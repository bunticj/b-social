class registerMessage {
    constructor( key, messages,topic = 'kafka-test-topic', partition = 0) {
      this.topic = topic;
      this.key = key;
      this.messages = messages;
      this.partition = partition;
    }
  }


  module.exports = registerMessage;   