import { Router, RequestHandler } from 'express';
import ContractController from '../controllers/ContractController';
import { authMiddleware, adminMiddleware } from '../middleware/authMiddleware';

const router = Router();

// 基本契約ルート
router.get('/', authMiddleware, (async (req, res) => {
  await ContractController.getAllContracts(req, res);
}) as RequestHandler);

router.get('/partner/:partnerId', authMiddleware, (async (req, res) => {
  await ContractController.getContractsByPartner(req, res);
}) as RequestHandler);

router.get('/:id', authMiddleware, (async (req, res) => {
  await ContractController.getContractById(req, res);
}) as RequestHandler);

router.post('/', authMiddleware, (async (req, res) => {
  await ContractController.createContract(req, res);
}) as RequestHandler);

router.put('/:id', authMiddleware, (async (req, res) => {
  await ContractController.updateContract(req, res);
}) as RequestHandler);

router.delete('/:id', [authMiddleware, (async (req, res, next) => {
  await adminMiddleware(req, res, next);
}) as RequestHandler], (async (req, res) => {
  await ContractController.deleteContract(req, res);
}) as RequestHandler);

export default router;
