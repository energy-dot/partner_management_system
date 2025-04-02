import { Request, Response } from 'express';
import Contract from '../models/Contract';
import Partner from '../models/Partner';

// 基本契約コントローラー
class ContractController {
  // 基本契約一覧取得
  public async getAllContracts(req: Request, res: Response): Promise<Response> {
    try {
      const contracts = await Contract.findAll({
        include: [{ model: Partner, attributes: ['id', 'name'] }]
      });
      return res.status(200).json({
        success: true,
        data: contracts
      });
    } catch (error) {
      console.error('Get all contracts error:', error);
      return res.status(500).json({
        success: false,
        message: 'サーバーエラーが発生しました'
      });
    }
  }

  // パートナー会社別の契約一覧取得
  public async getContractsByPartner(req: Request, res: Response): Promise<Response> {
    try {
      const { partnerId } = req.params;
      const contracts = await Contract.findAll({
        where: { partnerId },
        include: [{ model: Partner, attributes: ['id', 'name'] }]
      });
      
      return res.status(200).json({
        success: true,
        data: contracts
      });
    } catch (error) {
      console.error('Get contracts by partner error:', error);
      return res.status(500).json({
        success: false,
        message: 'サーバーエラーが発生しました'
      });
    }
  }

  // 基本契約詳細取得
  public async getContractById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const contract = await Contract.findByPk(id, {
        include: [{ model: Partner, attributes: ['id', 'name'] }]
      });
      
      if (!contract) {
        return res.status(404).json({
          success: false,
          message: '契約が見つかりません'
        });
      }

      return res.status(200).json({
        success: true,
        data: contract
      });
    } catch (error) {
      console.error('Get contract by id error:', error);
      return res.status(500).json({
        success: false,
        message: 'サーバーエラーが発生しました'
      });
    }
  }

  // 基本契約新規作成
  public async createContract(req: Request, res: Response): Promise<Response> {
    try {
      const contractData = req.body;
      
      // パートナー会社の存在確認
      const partner = await Partner.findByPk(contractData.partnerId);
      if (!partner) {
        return res.status(404).json({
          success: false,
          message: 'パートナー会社が見つかりません'
        });
      }
      
      const newContract = await Contract.create(contractData);
      
      return res.status(201).json({
        success: true,
        message: '契約を登録しました',
        data: newContract
      });
    } catch (error) {
      console.error('Create contract error:', error);
      return res.status(500).json({
        success: false,
        message: 'サーバーエラーが発生しました'
      });
    }
  }

  // 基本契約更新
  public async updateContract(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const contractData = req.body;
      
      const contract = await Contract.findByPk(id);
      if (!contract) {
        return res.status(404).json({
          success: false,
          message: '契約が見つかりません'
        });
      }
      
      // パートナー会社IDが変更される場合は存在確認
      if (contractData.partnerId && contractData.partnerId !== contract.partnerId) {
        const partner = await Partner.findByPk(contractData.partnerId);
        if (!partner) {
          return res.status(404).json({
            success: false,
            message: 'パートナー会社が見つかりません'
          });
        }
      }
      
      await contract.update(contractData);
      
      return res.status(200).json({
        success: true,
        message: '契約情報を更新しました',
        data: contract
      });
    } catch (error) {
      console.error('Update contract error:', error);
      return res.status(500).json({
        success: false,
        message: 'サーバーエラーが発生しました'
      });
    }
  }

  // 基本契約削除
  public async deleteContract(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      
      const contract = await Contract.findByPk(id);
      if (!contract) {
        return res.status(404).json({
          success: false,
          message: '契約が見つかりません'
        });
      }
      
      await contract.destroy();
      
      return res.status(200).json({
        success: true,
        message: '契約を削除しました'
      });
    } catch (error) {
      console.error('Delete contract error:', error);
      return res.status(500).json({
        success: false,
        message: 'サーバーエラーが発生しました'
      });
    }
  }
}

export default new ContractController();
