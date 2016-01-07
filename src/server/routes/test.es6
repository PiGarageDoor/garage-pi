import { Router as router } from 'express';
import * as userRepository from '../repositories/user';
import QRCode from '../lib/qrcode';

const routes = router();

routes.get('/', (req, res) => {
  userRepository.loadUserByName('Test').then(user => {
    if (!user) {
      return res.render('index');
    }
    const qr = new QRCode(user);
    const qrcode = qr.getQRCodeText();
    qr.generateImageData().then(svgdata => {
      return res.render('index', { svgdata, user, qrcode });
    }).catch(err => {
      res.status(500).send(err.message);
    });
  }).catch(err => {
    res.status(500).send(err.message);
  });
});

export default routes;