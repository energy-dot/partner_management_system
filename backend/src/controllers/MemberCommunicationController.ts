import { Request, Response } from 'express';
import MemberCommunication from '../models/MemberCommunication';
import Member from '../models/Member';
import User from '../models/User';

// 要員連絡・依頼コントローラー
class MemberCommunicationController {
  // 要員連絡・依頼一覧取得
  public async getAllCommunications(req: Request, res: Response): Promise<Response> {
    try {
      const communications = await MemberCommunication.findAll({
        include: [
          { model: Member, attributes: ['id', 'name', 'position'] },
          { model: User, attributes: ['id', 'name', 'email'] }
        ],
        order: [['createdAt', 'DESC']]
      });
      return res.status(200).json({
        success: true,
        data: communications
      });
    } catch (error) {
      console.error('Get all communications error:', error);
      return res.status(500).json({
        success: false,
        message: 'サーバーエラーが発生しました'
      });
    }
  }

  // 要員別の連絡・依頼一覧取得
  public async getCommunicationsByMember(req: Request, res: Response): Promise<Response> {
    try {
      const { memberId } = req.params;
      const communications = await MemberCommunication.findAll({
        where: { memberId },
        include: [
          { model: Member, attributes: ['id', 'name', 'position'] },
          { model: User, attributes: ['id', 'name', 'email'] }
        ],
        order: [['createdAt', 'DESC']]
      });
      
      return res.status(200).json({
        success: true,
        data: communications
      });
    } catch (error) {
      console.error('Get communications by member error:', error);
      return res.status(500).json({
        success: false,
        message: 'サーバーエラーが発生しました'
      });
    }
  }

  // ユーザー別の連絡・依頼一覧取得
  public async getCommunicationsByUser(req: Request, res: Response): Promise<Response> {
    try {
      const { userId } = req.params;
      const communications = await MemberCommunication.findAll({
        where: { userId },
        include: [
          { model: Member, attributes: ['id', 'name', 'position'] },
          { model: User, attributes: ['id', 'name', 'email'] }
        ],
        order: [['createdAt', 'DESC']]
      });
      
      return res.status(200).json({
        success: true,
        data: communications
      });
    } catch (error) {
      console.error('Get communications by user error:', error);
      return res.status(500).json({
        success: false,
        message: 'サーバーエラーが発生しました'
      });
    }
  }

  // 要員連絡・依頼詳細取得
  public async getCommunicationById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const communication = await MemberCommunication.findByPk(id, {
        include: [
          { model: Member, attributes: ['id', 'name', 'position', 'email', 'phone'] },
          { model: User, attributes: ['id', 'name', 'email'] }
        ]
      });
      
      if (!communication) {
        return res.status(404).json({
          success: false,
          message: '連絡・依頼が見つかりません'
        });
      }

      return res.status(200).json({
        success: true,
        data: communication
      });
    } catch (error) {
      console.error('Get communication by id error:', error);
      return res.status(500).json({
        success: false,
        message: 'サーバーエラーが発生しました'
      });
    }
  }

  // 要員連絡・依頼新規作成
  public async createCommunication(req: Request, res: Response): Promise<Response> {
    try {
      const communicationData = req.body;
      
      // 要員の存在確認
      const member = await Member.findByPk(communicationData.memberId);
      if (!member) {
        return res.status(404).json({
          success: false,
          message: '要員が見つかりません'
        });
      }
      
      // ユーザーの存在確認
      const user = await User.findByPk(communicationData.userId);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'ユーザーが見つかりません'
        });
      }
      
      const newCommunication = await MemberCommunication.create(communicationData);
      
      return res.status(201).json({
        success: true,
        message: '連絡・依頼を登録しました',
        data: newCommunication
      });
    } catch (error) {
      console.error('Create communication error:', error);
      return res.status(500).json({
        success: false,
        message: 'サーバーエラーが発生しました'
      });
    }
  }

  // 要員連絡・依頼更新
  public async updateCommunication(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const communicationData = req.body;
      
      const communication = await MemberCommunication.findByPk(id);
      if (!communication) {
        return res.status(404).json({
          success: false,
          message: '連絡・依頼が見つかりません'
        });
      }
      
      // ステータスが完了に変更される場合は完了日を設定
      if (communicationData.status === '完了' && communication.status !== '完了') {
        communicationData.completedDate = new Date();
      }
      
      await communication.update(communicationData);
      
      return res.status(200).json({
        success: true,
        message: '連絡・依頼情報を更新しました',
        data: communication
      });
    } catch (error) {
      console.error('Update communication error:', error);
      return res.status(500).json({
        success: false,
        message: 'サーバーエラーが発生しました'
      });
    }
  }

  // 要員連絡・依頼削除
  public async deleteCommunication(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      
      const communication = await MemberCommunication.findByPk(id);
      if (!communication) {
        return res.status(404).json({
          success: false,
          message: '連絡・依頼が見つかりません'
        });
      }
      
      await communication.destroy();
      
      return res.status(200).json({
        success: true,
        message: '連絡・依頼を削除しました'
      });
    } catch (error) {
      console.error('Delete communication error:', error);
      return res.status(500).json({
        success: false,
        message: 'サーバーエラーが発生しました'
      });
    }
  }
}

export default new MemberCommunicationController();
