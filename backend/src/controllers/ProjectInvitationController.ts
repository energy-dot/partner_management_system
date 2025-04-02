import { Request, Response } from 'express';
import ProjectInvitation from '../models/ProjectInvitation';
import Project from '../models/Project';
import Partner from '../models/Partner';

// 案件募集送信コントローラー
class ProjectInvitationController {
  // 案件募集一覧取得
  public async getAllInvitations(req: Request, res: Response): Promise<Response> {
    try {
      const invitations = await ProjectInvitation.findAll({
        include: [
          { model: Project, attributes: ['id', 'name', 'status'] },
          { model: Partner, attributes: ['id', 'name'] }
        ]
      });
      return res.status(200).json({
        success: true,
        data: invitations
      });
    } catch (error) {
      console.error('Get all invitations error:', error);
      return res.status(500).json({
        success: false,
        message: 'サーバーエラーが発生しました'
      });
    }
  }

  // 案件別の募集一覧取得
  public async getInvitationsByProject(req: Request, res: Response): Promise<Response> {
    try {
      const { projectId } = req.params;
      const invitations = await ProjectInvitation.findAll({
        where: { projectId },
        include: [
          { model: Project, attributes: ['id', 'name', 'status'] },
          { model: Partner, attributes: ['id', 'name'] }
        ]
      });
      
      return res.status(200).json({
        success: true,
        data: invitations
      });
    } catch (error) {
      console.error('Get invitations by project error:', error);
      return res.status(500).json({
        success: false,
        message: 'サーバーエラーが発生しました'
      });
    }
  }

  // パートナー会社別の募集一覧取得
  public async getInvitationsByPartner(req: Request, res: Response): Promise<Response> {
    try {
      const { partnerId } = req.params;
      const invitations = await ProjectInvitation.findAll({
        where: { partnerId },
        include: [
          { model: Project, attributes: ['id', 'name', 'status'] },
          { model: Partner, attributes: ['id', 'name'] }
        ]
      });
      
      return res.status(200).json({
        success: true,
        data: invitations
      });
    } catch (error) {
      console.error('Get invitations by partner error:', error);
      return res.status(500).json({
        success: false,
        message: 'サーバーエラーが発生しました'
      });
    }
  }

  // 案件募集詳細取得
  public async getInvitationById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const invitation = await ProjectInvitation.findByPk(id, {
        include: [
          { model: Project, attributes: ['id', 'name', 'status', 'description', 'startDate', 'endDate'] },
          { model: Partner, attributes: ['id', 'name', 'status'] }
        ]
      });
      
      if (!invitation) {
        return res.status(404).json({
          success: false,
          message: '案件募集が見つかりません'
        });
      }

      return res.status(200).json({
        success: true,
        data: invitation
      });
    } catch (error) {
      console.error('Get invitation by id error:', error);
      return res.status(500).json({
        success: false,
        message: 'サーバーエラーが発生しました'
      });
    }
  }

  // 案件募集送信
  public async createInvitation(req: Request, res: Response): Promise<Response> {
    try {
      const invitationData = req.body;
      
      // 案件の存在確認
      const project = await Project.findByPk(invitationData.projectId);
      if (!project) {
        return res.status(404).json({
          success: false,
          message: '案件が見つかりません'
        });
      }
      
      // パートナー会社の存在確認
      const partner = await Partner.findByPk(invitationData.partnerId);
      if (!partner) {
        return res.status(404).json({
          success: false,
          message: 'パートナー会社が見つかりません'
        });
      }
      
      const newInvitation = await ProjectInvitation.create(invitationData);
      
      return res.status(201).json({
        success: true,
        message: '案件募集を送信しました',
        data: newInvitation
      });
    } catch (error) {
      console.error('Create invitation error:', error);
      return res.status(500).json({
        success: false,
        message: 'サーバーエラーが発生しました'
      });
    }
  }

  // 複数パートナーへの一括送信
  public async createBulkInvitations(req: Request, res: Response): Promise<Response> {
    try {
      const { projectId, partnerIds, responseDeadline, remarks } = req.body;
      
      // 案件の存在確認
      const project = await Project.findByPk(projectId);
      if (!project) {
        return res.status(404).json({
          success: false,
          message: '案件が見つかりません'
        });
      }
      
      // パートナー会社の存在確認
      const partners = await Partner.findAll({
        where: {
          id: partnerIds
        }
      });
      
      if (partners.length !== partnerIds.length) {
        return res.status(404).json({
          success: false,
          message: '一部のパートナー会社が見つかりません'
        });
      }
      
      // 一括作成用のデータ準備
      const invitationsData = partnerIds.map((partnerId: number) => ({
        projectId,
        partnerId,
        sentDate: new Date(),
        responseDeadline,
        status: '送信済',
        remarks
      }));
      
      const newInvitations = await ProjectInvitation.bulkCreate(invitationsData);
      
      return res.status(201).json({
        success: true,
        message: `${newInvitations.length}社のパートナー会社に案件募集を送信しました`,
        data: newInvitations
      });
    } catch (error) {
      console.error('Create bulk invitations error:', error);
      return res.status(500).json({
        success: false,
        message: 'サーバーエラーが発生しました'
      });
    }
  }

  // 案件募集更新
  public async updateInvitation(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const invitationData = req.body;
      
      const invitation = await ProjectInvitation.findByPk(id);
      if (!invitation) {
        return res.status(404).json({
          success: false,
          message: '案件募集が見つかりません'
        });
      }
      
      await invitation.update(invitationData);
      
      return res.status(200).json({
        success: true,
        message: '案件募集情報を更新しました',
        data: invitation
      });
    } catch (error) {
      console.error('Update invitation error:', error);
      return res.status(500).json({
        success: false,
        message: 'サーバーエラーが発生しました'
      });
    }
  }

  // 案件募集キャンセル
  public async cancelInvitation(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { remarks } = req.body;
      
      const invitation = await ProjectInvitation.findByPk(id);
      if (!invitation) {
        return res.status(404).json({
          success: false,
          message: '案件募集が見つかりません'
        });
      }
      
      await invitation.update({
        status: 'キャンセル',
        remarks: remarks ? `${invitation.remarks || ''}\n【キャンセル理由】${remarks}` : invitation.remarks
      });
      
      return res.status(200).json({
        success: true,
        message: '案件募集をキャンセルしました',
        data: invitation
      });
    } catch (error) {
      console.error('Cancel invitation error:', error);
      return res.status(500).json({
        success: false,
        message: 'サーバーエラーが発生しました'
      });
    }
  }
}

export default new ProjectInvitationController();
