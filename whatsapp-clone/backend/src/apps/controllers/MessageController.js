const Messages = require('../models/Messages')
const User = require('../models/Users')
const crypto = require('crypto')
const moment = require('moment')
const Message = require('../models/Messages')
const { compare } = require('../../utils/utils')

class MessageController {
    async sendMessage(req, res) {
        const { text, user_send, user_destination } = req.body

        if (user_destination === user_send) {
            return res.status(400).json({ message: "Você não pode enviar mensagens para si mesmo!" })
        }

        const message = await Messages.create({
            text,
            user_id: user_send,
            user_destination
        })

        const formatteddata = {
            id: message.id,
            text: message.text,
            user_id: message.user_id
        }

        const receiver = crypto.createHash('md5').update(`${user_destination}`).digest('hex')

        req.io.emit(`${receiver}`, formatteddata)

        return res.status(200).json(formatteddata)
    }

    async listAllMessages(req, res) {
        const { userId, myId } = req.params

        const messagesReceiver = await Message.findAll({
            raw: true,
            nest: true,
            attributes: ['id', 'text', 'createdAt'],
            include: [
                {
                    model: User, as: 'user',
                    attributes: ['name', 'id']
                }
            ],
            where: {
                user_id: userId,
                user_destination: myId
            }
        })

        const messagesSend = await Message.findAll({
            raw: true,
            nest: true,
            attributes: ['id', 'text', 'createdAt'],
            include: [
                {
                    model: User, as: 'user',
                    attributes: ['name', 'id']
                }
            ],
            where: {
                user_id: myId,
                user_destination: userId
            }
        })

        const messages = [...messagesReceiver, ...messagesSend]

        if (messages.length === 0) {
            return res.status(404).json({ message: "Sem mensagens para carregar!" })
        }
        const formattedData = []
        moment.locale('pt-br')

        for (const item of messages) {
            formattedData.push({
                item: item.id,
                text: item.text,
                hour: moment(item.createdAt).format('hh:mm'),
                user: item.user.name,
                userId: item.user.id
            })
        }

        formattedData.sort(compare)

        return res.status(200).json(formattedData)

    }
}

module.exports = new MessageController()