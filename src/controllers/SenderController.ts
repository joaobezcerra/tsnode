import * as amqp from 'amqplib';
import connection from './../utils/ConnectionAMQP';

class SenderController {
  public sender(queueName = 'hello', messageCount = 10): void {
    amqp.connect(connection)
      .then((conn: amqp.Connection) => {
        conn.createChannel()
          .then((ch: amqp.Channel) => {
            let counter = 1;
            ch.assertQueue(queueName, { durable: false });
            for (let i = 0; i < messageCount; i++) {
              let Msg = `n° ${counter++}!`;
              ch.sendToQueue(queueName, Buffer.from(Msg));
              console.log(' [x] Enviando mensagem %s', Msg);
            }
            conn.close();
          })
          .catch((err) => {
            console.error('Erro ao criar canal ou enviar mensagens:', err);
            conn.close();
          });
      })
      .catch((err) => {
        console.error('Erro ao conectar ao RabbitMQ:', err);
      });
  }
}

export default new SenderController();
