import { Request, Response } from 'express';
import IndividualContract from '../models/IndividualContract';
import Member from '../models/Member';
import Project from '../models/Project';

// 個別契約コントローラー
class IndividualContractController {
  // 個別契約一覧取得
  public async getAllContracts(req: Request, res: Response): Promise<Response> {
    try {
      const contracts = await IndividualContract.findAll({
        include: [
          { model: Member, attributes: ['id', 'name', 'position'] },
          { model: Project, attributes: ['id', 'name', 'status'] }
        ]
      });
      return res.status(200).json({
        success: true,
        data: contracts
      });
    } catch (error) {
      console.error('Get all individual contracts error:', error);
      return res.status(500).json({
        success: false,
        message: 'サーバーエラーが発生しました'
      });
    }
  }

  // 要員別の個別契約一覧取得
  public async getContractsByMember(req: Request, res: Response): Promise<Response> {
    try {
      const { memberId } = req.params;
      const contracts = await IndividualContract.findAll({
        where: { memberId },
        include: [
          { model: Member, attributes: ['id', 'name', 'position'] },
          { model: Project, attributes: ['id', 'name', 'status'] }
        ]
      });
      
      return res.status(200).json({
        success: true,
        data: contracts
      });
    } catch (error) {
      console.error('Get contracts by member error:', error);
      return res.status(500).json({
        success: false,
        message: 'サーバーエラーが発生しました'
      });
    }
  }

  // 案件別の個別契約一覧取得
  public async getContractsByProject(req: Request, res: Response): Promise<Response> {
    try {
      const { projectId } = req.params;
      const contracts = await IndividualContract.findAll({
        where: { projectId },
        include: [
          { model: Member, attributes: ['id', 'name', 'position'] },
          { model: Project, attributes: ['id', 'name', 'status'] }
        ]
      });
      
      return res.status(200).json({
        success: true,
        data: contracts
      });
    } catch (error) {
      console.error('Get contracts by project error:', error);
      return res.status(500).json({
        success: false,
        message: 'サーバーエラーが発生しました'
      });
    }
  }

  // 個別契約詳細取得
  public async getContractById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const contract = await IndividualContract.findByPk(id, {
        include: [
          { model: Member, attributes: ['id', 'name', 'position', 'email', 'phone'] },
          { model: Project, attributes: ['id', 'name', 'status', 'description', 'startDate', 'endDate'] }
        ]
      });
      
      if (!contract) {
        return res.status(404).json({
          success: false,
          message: '個別契約が見つかりません'
        });
      }

      return res.status(200).json({
        success: true,
        data: contract
      });
    } catch (error) {
      console.error('Get individual contract by id error:', error);
      return res.status(500).json({
        success: false,
        message: 'サーバーエラーが発生しました'
      });
    }
  }

  // 個別契約新規作成
  public async createContract(req: Request, res: Response): Promise<Response> {
    try {
      const contractData = req.body;
      
      // 要員の存在確認
      const member = await Member.findByPk(contractData.memberId);
      if (!member) {
        return res.status(404).json({
          success: false,
          message: '要員が見つかりません'
        });
      }
      
      // 案件の存在確認
      const project = await Project.findByPk(contractData.projectId);
      if (!project) {
        return res.status(404).json({
          success: false,
          message: '案件が見つかりません'
        });
      }
      
      const newContract = await IndividualContract.create(contractData);
      
      return res.status(201).json({
        success: true,
        message: '個別契約を登録しました',
        data: newContract
      });
    } catch (error) {
      console.error('Create individual contract error:', error);
      return res.status(500).json({
        success: false,
        message: 'サーバーエラーが発生しました'
      });
    }
  }

  // 個別契約更新
  public async updateContract(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const contractData = req.body;
      
      const contract = await IndividualContract.findByPk(id);
      if (!contract) {
        return res.status(404).json({
          success: false,
          message: '個別契約が見つかりません'
        });
      }
      
      // 要員IDが変更される場合は存在確認
      if (contractData.memberId && contractData.memberId !== contract.memberId) {
        const member = await Member.findByPk(contractData.memberId);
        if (!member) {
          return res.status(404).json({
            success: false,
            message: '要員が見つかりません'
          });
        }
      }
      
      // 案件IDが変更される場合は存在確認
      if (contractData.projectId && contractData.projectId !== contract.projectId) {
        const project = await Project.findByPk(contractData.projectId);
        if (!project) {
          return res.status(404).json({
            success: false,
            message: '案件が見つかりません'
          });
        }
      }
      
      await contract.update(contractData);
      
      return res.status(200).json({
        success: true,
        message: '個別契約情報を更新しました',
        data: contract
      });
    } catch (error) {
      console.error('Update individual contract error:', error);
      return res.status(500).json({
        success: false,
        message: 'サーバーエラーが発生しました'
      });
    }
  }

  // 個別契約削除
  public async deleteContract(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      
      const contract = await IndividualContract.findByPk(id);
      if (!contract) {
        return res.status(404).json({
          success: false,
          message: '個別契約が見つかりません'
        });
      }
      
      await contract.destroy();
      
      return res.status(200).json({
        success: true,
        message: '個別契約を削除しました'
      });
    } catch (error) {
      console.error('Delete individual contract error:', error);
      return res.status(500).json({
        success: false,
        message: 'サーバーエラーが発生しました'
      });
    }
  }
}

export default new IndividualContractController();
