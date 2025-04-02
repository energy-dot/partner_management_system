import { Router, RequestHandler } from 'express';
import MemberCommunicationController from '../controllers/MemberCommunicationController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

// 要員連絡・依頼ルート
router.get('/', authMiddleware, (async (req, res) => {
  await MemberCommunicationController.getAllCommunications(req, res);
}) as RequestHandler);

router.get('/member/:memberId', authMiddleware, (async (req, res) => {
  await MemberCommunicationController.getCommunicationsByMember(req, res);
}) as RequestHandler);

router.get('/user/:userId', authMiddleware, (async (req, res) => {
  await MemberCommunicationController.getCommunicationsByUser(req, res);
}) as RequestHandler);

router.get('/:id', authMiddleware, (async (req, res) => {
  await MemberCommunicationController.getCommunicationById(req, res);
}) as RequestHandler);

router.post('/', authMiddleware, (async (req, res) => {
  await MemberCommunicationController.createCommunication(req, res);
}) as RequestHandler);

router.put('/:id', authMiddleware, (async (req, res) => {
  await MemberCommunicationController.updateCommunication(req, res);
}) as RequestHandler);

router.delete('/:id', authMiddleware, (async (req, res) => {
  await MemberCommunicationController.deleteCommunication(req, res);
}) as RequestHandler);

export default router;
