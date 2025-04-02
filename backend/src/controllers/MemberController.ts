import { Request, Response } from 'express';
import Member from '../models/Member';
import Partner from '../models/Partner';
import Project from '../models/Project';

// 要員コントローラー
class MemberController {
  // 要員一覧取得
  public async getAllMembers(req: Request, res: Response): Promise<Response> {
    try {
      const members = await Member.findAll({
        include: [
          { model: Partner, attributes: ['name'] },
          { model: Project, attributes: ['name'] }
        ]
      });
      return res.status(200).json({
        success: true,
        data: members
      });
    } catch (error) {
      console.error('Get all members error:', error);
      return res.status(500).json({
        success: false,
        message: 'サーバーエラーが発生しました'
      });
    }
  }

  // 要員詳細取得
  public async getMemberById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const member = await Member.findByPk(id, {
        include: [
          { model: Partner, attributes: ['id', 'name'] },
          { model: Project, attributes: ['id', 'name'] }
        ]
      });
      
      if (!member) {
        return res.status(404).json({
          success: false,
          message: '要員が見つかりません'
        });
      }

      return res.status(200).json({
        success: true,
        data: member
      });
    } catch (error) {
      console.error('Get member by id error:', error);
      return res.status(500).json({
        success: false,
        message: 'サーバーエラーが発生しました'
      });
    }
  }

  // 要員新規作成
  public async createMember(req: Request, res: Response): Promise<Response> {
    try {
      const memberData = req.body;
      
      // パートナー会社の存在確認
      const partner = await Partner.findByPk(memberData.partnerId);
      if (!partner) {
        return res.status(400).json({
          success: false,
          message: '指定されたパートナー会社が存在しません'
        });
      }
      
      // プロジェクトの存在確認（指定されている場合）
      if (memberData.projectId) {
        const project = await Project.findByPk(memberData.projectId);
        if (!project) {
          return res.status(400).json({
            success: false,
            message: '指定された案件が存在しません'
          });
        }
      }
      
      const newMember = await Member.create(memberData);
      
      return res.status(201).json({
        success: true,
        message: '要員を登録しました',
        data: newMember
      });
    } catch (error) {
      console.error('Create member error:', error);
      return res.status(500).json({
        success: false,
        message: 'サーバーエラーが発生しました'
      });
    }
  }

  // 要員更新
  public async updateMember(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const memberData = req.body;
      
      const member = await Member.findByPk(id);
      if (!member) {
        return res.status(404).json({
          success: false,
          message: '要員が見つかりません'
        });
      }
      
      // パートナー会社の存在確認（変更されている場合）
      if (memberData.partnerId && memberData.partnerId !== member.partnerId) {
        const partner = await Partner.findByPk(memberData.partnerId);
        if (!partner) {
          return res.status(400).json({
            success: false,
            message: '指定されたパートナー会社が存在しません'
          });
        }
      }
      
      // プロジェクトの存在確認（指定されている場合）
      if (memberData.projectId && memberData.projectId !== member.projectId) {
        const project = await Project.findByPk(memberData.projectId);
        if (!project) {
          return res.status(400).json({
            success: false,
            message: '指定された案件が存在しません'
          });
        }
      }
      
      await member.update(memberData);
      
      return res.status(200).json({
        success: true,
        message: '要員情報を更新しました',
        data: member
      });
    } catch (error) {
      console.error('Update member error:', error);
      return res.status(500).json({
        success: false,
        message: 'サーバーエラーが発生しました'
      });
    }
  }

  // 要員削除
  public async deleteMember(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      
      const member = await Member.findByPk(id);
      if (!member) {
        return res.status(404).json({
          success: false,
          message: '要員が見つかりません'
        });
      }
      
      await member.destroy();
      
      return res.status(200).json({
        success: true,
        message: '要員を削除しました'
      });
    } catch (error) {
      console.error('Delete member error:', error);
      return res.status(500).json({
        success: false,
        message: 'サーバーエラーが発生しました'
      });
    }
  }
}

export default new MemberController();
