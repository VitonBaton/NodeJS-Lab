const MicroMQ = require('micromq');
const nodemailer = require('nodemailer');
const config = require('./config');

const app = new MicroMQ({
    name: 'mailer',
    rabbit: {
        url: "amqp://guest:guest@localhost:5672",
    },
});

app.post('/signup', (req, res, next) => {
    try {
        sendMail(req.body);
        res.json({
            id: req.id
        });
    } catch (err) {
        console.log(err);
    }
})


async function sendMail(user) {

    let transporter = await nodemailer.createTransport({
        host: 'smtp.yandex.ru',
        port: 465,
        secure: true,
        auth: {
            user: config.login,
            pass: config.password
        },
    });

    let result = await transporter.sendMail({
        from: '"Register bot taxisite.com" <vitonbaton@yandex.ru>',
        to: user.email,
        subject: 'Register on taxisite.com',
        text: `Hello ${user.login}. This message was sent to you, because you are successfully registered on our taxisite`,
        html: `Hello ${user.login}. This message was sent to you, because you are successfully registered on our taxisite`,
    });
    console.log(result);
}

app.start();
console.log("Mailer service started");