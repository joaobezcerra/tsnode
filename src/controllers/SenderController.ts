import * as amqp from 'amqplib'
import connection from './../utils/ConnectionAMQP'

class SenderController {
  public sender (): void {
    amqp.connect(connection)
      .then((conn: amqp.Connection) => {
        conn.createChannel()
          .then((ch: amqp.Channel) => {
            let qeue = 'hello'
            let counter = 1
            ch.assertQueue(qeue, { durable: false })
            for (let i = 0; i < 10; i++) {
              let Msg = `n° ${counter++}!`
              ch.sendToQueue(qeue, Buffer.from(Msg))
              console.log(' [x] Enviando mensagem %s', Msg)
            }
          })
        setTimeout(() => {
          conn.close()
          process.exit(0)
        }, 10000)
      })
  }
}

export default new SenderController()