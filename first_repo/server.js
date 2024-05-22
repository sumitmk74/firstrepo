const express = require('express');
const bodyParser = require('body-parser');
const QRCode = require('qrcode');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

app.post('/generate', (req, res) => {
    const { name, email, phone } = req.body;
    const data = `Name: ${name}\nEmail: ${email}\nPhone: ${phone}`;
    
    QRCode.toDataURL(data, (err, url) => {
        if (err) return res.status(500).send('Error generating QR code');
        res.send({ qrCodeUrl: url });
    });
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
