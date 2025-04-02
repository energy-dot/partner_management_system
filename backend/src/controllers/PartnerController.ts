import { Request, Response } from 'express';
import Partner from '../models/Partner';

// パートナー会社コントローラー
class PartnerController {
  // パートナー会社一覧取得
  public async getAllPartners(req: Request, res: Response): Promise<Response> {
    try {
      const partners = await Partner.findAll();
      return res.status(200).json({
        success: true,
        data: partners
      });
    } catch (error) {
      console.error('Get all partners error:', error);
      return res.status(500).json({
        success: false,
        message: 'サーバーエラーが発生しました'
      });
    }
  }

  // パートナー会社詳細取得
  public async getPartnerById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const partner = await Partner.findByPk(id);
      
      if (!partner) {
        return res.status(404).json({
          success: false,
          message: 'パートナー会社が見つかりません'
        });
      }

      return res.status(200).json({
        success: true,
        data: partner
      });
    } catch (error) {
      console.error('Get partner by id error:', error);
      return res.status(500).json({
        success: false,
        message: 'サーバーエラーが発生しました'
      });
    }
  }

  // パートナー会社新規作成
  public async createPartner(req: Request, res: Response): Promise<Response> {
    try {
      const partnerData = req.body;
      const newPartner = await Partner.create(partnerData);
      
      return res.status(201).json({
        success: true,
        message: 'パートナー会社を登録しました',
        data: newPartner
      });
    } catch (error) {
      console.error('Create partner error:', error);
      return res.status(500).json({
        success: false,
        message: 'サーバーエラーが発生しました'
      });
    }
  }

  // パートナー会社更新
  public async updatePartner(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const partnerData = req.body;
      
      const partner = await Partner.findByPk(id);
      if (!partner) {
        return res.status(404).json({
          success: false,
          message: 'パートナー会社が見つかりません'
        });
      }
      
      await partner.update(partnerData);
      
      return res.status(200).json({
        success: true,
        message: 'パートナー会社情報を更新しました',
        data: partner
      });
    } catch (error) {
      console.error('Update partner error:', error);
      return res.status(500).json({
        success: false,
        message: 'サーバーエラーが発生しました'
      });
    }
  }

  // パートナー会社削除
  public async deletePartner(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      
      const partner = await Partner.findByPk(id);
      if (!partner) {
        return res.status(404).json({
          success: false,
          message: 'パートナー会社が見つかりません'
        });
      }
      
      await partner.destroy();
      
      return res.status(200).json({
        success: true,
        message: 'パートナー会社を削除しました'
      });
    } catch (error) {
      console.error('Delete partner error:', error);
      return res.status(500).json({
        success: false,
        message: 'サーバーエラーが発生しました'
      });
    }
  }
}

export default new PartnerController();
