import * as amqp from 'amqplib';
import { Request, Response } from 'express';
import connection from './../utils/ConnectionAMQP';
import { Channel, ConsumeMessage } from 'amqplib'; // Import types

class AmqpController {
  private channel: Channel | null = null; // Store channel for proper closing

  public async connecting(req: Request, res: Response): Promise<void> {
    res.json('Olá');

    try {
      const conn = await amqp.connect(connection);
      this.channel = await conn.createChannel(); // Store the channel

      const queue = 'hello';
      await this.channel.assertQueue(queue, { durable: false });
      this.channel.prefetch(1);

      console.log(' [*] Aguardando por mensagens da fila %s. Para sair pressione CTRL+C', queue);

      this.channel.consume(queue, (msg: ConsumeMessage | null) => { // Type the msg
        if (msg) {
          try {
            console.log(' [x] Recebido %s', msg.content.toString());
            // Process the message here...

            this.channel?.ack(msg); // Acknowledge message after processing
          } catch (error) {
            console.error("Error processing message:", error);
            this.channel?.nack(msg, false, true); // Requeue on error
          }
        } else {
          console.log("Consumer cancelled by server");
        }
      }, { noAck: false }); // VERY IMPORTANT: noAck is now false

    } catch (error) {
      console.error("Error connecting to RabbitMQ:", error);
      res.status(500).json({ error: 'Failed to connect to RabbitMQ' }); // Send error response
    }
  }

  public async closeConnection(): Promise<void> {
    try {
      if (this.channel) {
        await this.channel.close();
      }
    } catch (error) {
      console.error("Error closing channel:", error);
    } finally {
      this.channel = null;
    }
  }
}

export default new AmqpController();
