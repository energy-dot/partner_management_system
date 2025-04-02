import { Request, Response } from 'express';
import Application from '../models/Application';
import Partner from '../models/Partner';
import Project from '../models/Project';
import Member from '../models/Member';

// 応募コントローラー
class ApplicationController {
  // 応募一覧取得
  public async getAllApplications(req: Request, res: Response): Promise<Response> {
    try {
      const applications = await Application.findAll({
        include: [
          { model: Partner, attributes: ['name'] },
          { model: Project, attributes: ['name'] }
        ]
      });
      return res.status(200).json({
        success: true,
        data: applications
      });
    } catch (error) {
      console.error('Get all applications error:', error);
      return res.status(500).json({
        success: false,
        message: 'サーバーエラーが発生しました'
      });
    }
  }

  // 応募詳細取得
  public async getApplicationById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const application = await Application.findByPk(id, {
        include: [
          { model: Partner, attributes: ['id', 'name'] },
          { model: Project, attributes: ['id', 'name'] }
        ]
      });
      
      if (!application) {
        return res.status(404).json({
          success: false,
          message: '応募が見つかりません'
        });
      }

      return res.status(200).json({
        success: true,
        data: application
      });
    } catch (error) {
      console.error('Get application by id error:', error);
      return res.status(500).json({
        success: false,
        message: 'サーバーエラーが発生しました'
      });
    }
  }

  // 応募新規作成
  public async createApplication(req: Request, res: Response): Promise<Response> {
    try {
      const applicationData = req.body;
      
      // パートナー会社の存在確認
      const partner = await Partner.findByPk(applicationData.partnerId);
      if (!partner) {
        return res.status(400).json({
          success: false,
          message: '指定されたパートナー会社が存在しません'
        });
      }
      
      // プロジェクトの存在確認
      const project = await Project.findByPk(applicationData.projectId);
      if (!project) {
        return res.status(400).json({
          success: false,
          message: '指定された案件が存在しません'
        });
      }
      
      const newApplication = await Application.create(applicationData);
      
      return res.status(201).json({
        success: true,
        message: '応募を登録しました',
        data: newApplication
      });
    } catch (error) {
      console.error('Create application error:', error);
      return res.status(500).json({
        success: false,
        message: 'サーバーエラーが発生しました'
      });
    }
  }

  // 応募更新
  public async updateApplication(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const applicationData = req.body;
      
      const application = await Application.findByPk(id);
      if (!application) {
        return res.status(404).json({
          success: false,
          message: '応募が見つかりません'
        });
      }
      
      await application.update(applicationData);
      
      return res.status(200).json({
        success: true,
        message: '応募情報を更新しました',
        data: application
      });
    } catch (error) {
      console.error('Update application error:', error);
      return res.status(500).json({
        success: false,
        message: 'サーバーエラーが発生しました'
      });
    }
  }

  // 応募承認（要員として登録）
  public async approveApplication(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      
      const application = await Application.findByPk(id, {
        include: [
          { model: Partner },
          { model: Project }
        ]
      });
      
      if (!application) {
        return res.status(404).json({
          success: false,
          message: '応募が見つかりません'
        });
      }
      
      if (application.status !== '審査中') {
        return res.status(400).json({
          success: false,
          message: 'この応募は既に処理されています'
        });
      }
      
      // 応募を承認済みに更新
      await application.update({ status: '承認済' });
      
      // 要員として登録
      const newMember = await Member.create({
        name: application.applicantName,
        partnerId: application.partnerId,
        skills: application.skills,
        projectId: application.projectId,
        startDate: new Date(), // 開始日は現在日付
        rate: application.rate,
        status: '稼働中'
      });
      
      return res.status(200).json({
        success: true,
        message: '応募を承認し、要員として登録しました',
        data: {
          application,
          member: newMember
        }
      });
    } catch (error) {
      console.error('Approve application error:', error);
      return res.status(500).json({
        success: false,
        message: 'サーバーエラーが発生しました'
      });
    }
  }

  // 応募却下
  public async rejectApplication(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { reason } = req.body;
      
      const application = await Application.findByPk(id);
      if (!application) {
        return res.status(404).json({
          success: false,
          message: '応募が見つかりません'
        });
      }
      
      if (application.status !== '審査中') {
        return res.status(400).json({
          success: false,
          message: 'この応募は既に処理されています'
        });
      }
      
      // 応募を却下に更新
      await application.update({ 
        status: '却下',
        remarks: reason || '要件に合致しないため'
      });
      
      return res.status(200).json({
        success: true,
        message: '応募を却下しました',
        data: application
      });
    } catch (error) {
      console.error('Reject application error:', error);
      return res.status(500).json({
        success: false,
        message: 'サーバーエラーが発生しました'
      });
    }
  }
}

export default new ApplicationController();
