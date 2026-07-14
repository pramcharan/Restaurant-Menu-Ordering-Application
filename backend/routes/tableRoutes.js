import express from 'express';
import {createTableSession, getTableSession, closeTableSession} from '../controllers/tableSessionController.js';

const router = express.Router();

router.route('/session')
    .post(createTableSession);

router.route('/session/:sessionId')
    .get(getTableSession)

router.route('/session/:sessionId/close')
    .patch(closeTableSession);

export default router;