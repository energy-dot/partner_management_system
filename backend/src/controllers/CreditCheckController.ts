import { Request, Response } from 'express';
import Partner from '../models/Partner';

// 信用調査/反社チェックコントローラー
class CreditCheckController {
  // 信用調査実施
  public async performCreditCheck(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { checkDate, remarks } = req.body;
      
      const partner = await Partner.findByPk(id);
      if (!partner) {
        return res.status(404).json({
          success: false,
          message: 'パートナー会社が見つかりません'
        });
      }
      
      await partner.update({
        creditCheckDate: checkDate || new Date(),
        remarks: remarks ? `${partner.remarks || ''}\n【信用調査】${remarks}` : partner.remarks
      });
      
      return res.status(200).json({
        success: true,
        message: '信用調査情報を更新しました',
        data: partner
      });
    } catch (error) {
      console.error('Credit check error:', error);
      return res.status(500).json({
        success: false,
        message: 'サーバーエラーが発生しました'
      });
    }
  }

  // 反社チェック実施
  public async performAntiSocialCheck(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { checkDate, remarks } = req.body;
      
      const partner = await Partner.findByPk(id);
      if (!partner) {
        return res.status(404).json({
          success: false,
          message: 'パートナー会社が見つかりません'
        });
      }
      
      await partner.update({
        antiSocialCheckDate: checkDate || new Date(),
        remarks: remarks ? `${partner.remarks || ''}\n【反社チェック】${remarks}` : partner.remarks
      });
      
      return res.status(200).json({
        success: true,
        message: '反社チェック情報を更新しました',
        data: partner
      });
    } catch (error) {
      console.error('Anti-social check error:', error);
      return res.status(500).json({
        success: false,
        message: 'サーバーエラーが発生しました'
      });
    }
  }

  // 信用調査/反社チェック履歴取得
  public async getCheckHistory(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      
      const partner = await Partner.findByPk(id);
      if (!partner) {
        return res.status(404).json({
          success: false,
          message: 'パートナー会社が見つかりません'
        });
      }
      
      const checkHistory = {
        partnerId: partner.id,
        partnerName: partner.name,
        creditCheckDate: partner.creditCheckDate,
        antiSocialCheckDate: partner.antiSocialCheckDate,
        remarks: partner.remarks
      };
      
      return res.status(200).json({
        success: true,
        data: checkHistory
      });
    } catch (error) {
      console.error('Get check history error:', error);
      return res.status(500).json({
        success: false,
        message: 'サーバーエラーが発生しました'
      });
    }
  }
}

export default new CreditCheckController();
