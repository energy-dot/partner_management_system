import { Router, RequestHandler } from 'express';
import IndividualContractController from '../controllers/IndividualContractController';
import { authMiddleware, adminMiddleware } from '../middleware/authMiddleware';

const router = Router();

// 個別契約ルート
router.get('/', authMiddleware, (async (req, res) => {
  await IndividualContractController.getAllContracts(req, res);
}) as RequestHandler);

router.get('/member/:memberId', authMiddleware, (async (req, res) => {
  await IndividualContractController.getContractsByMember(req, res);
}) as RequestHandler);

router.get('/project/:projectId', authMiddleware, (async (req, res) => {
  await IndividualContractController.getContractsByProject(req, res);
}) as RequestHandler);

router.get('/:id', authMiddleware, (async (req, res) => {
  await IndividualContractController.getContractById(req, res);
}) as RequestHandler);

router.post('/', authMiddleware, (async (req, res) => {
  await IndividualContractController.createContract(req, res);
}) as RequestHandler);

router.put('/:id', authMiddleware, (async (req, res) => {
  await IndividualContractController.updateContract(req, res);
}) as RequestHandler);

router.delete('/:id', [authMiddleware, (async (req, res, next) => {
  await adminMiddleware(req, res, next);
}) as RequestHandler], (async (req, res) => {
  await IndividualContractController.deleteContract(req, res);
}) as RequestHandler);

export default router;
