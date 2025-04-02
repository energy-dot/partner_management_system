import { Request, Response } from 'express';
import MemberEvaluation from '../models/MemberEvaluation';
import Member from '../models/Member';
import User from '../models/User';

// 要員評価コントローラー
class MemberEvaluationController {
  // 要員評価一覧取得
  public async getAllEvaluations(req: Request, res: Response): Promise<Response> {
    try {
      const evaluations = await MemberEvaluation.findAll({
        include: [
          { model: Member, attributes: ['id', 'name', 'position'] },
          { model: User, attributes: ['id', 'name', 'email'] }
        ],
        order: [['evaluationDate', 'DESC']]
      });
      return res.status(200).json({
        success: true,
        data: evaluations
      });
    } catch (error) {
      console.error('Get all evaluations error:', error);
      return res.status(500).json({
        success: false,
        message: 'サーバーエラーが発生しました'
      });
    }
  }

  // 要員別の評価一覧取得
  public async getEvaluationsByMember(req: Request, res: Response): Promise<Response> {
    try {
      const { memberId } = req.params;
      const evaluations = await MemberEvaluation.findAll({
        where: { memberId },
        include: [
          { model: Member, attributes: ['id', 'name', 'position'] },
          { model: User, attributes: ['id', 'name', 'email'] }
        ],
        order: [['evaluationDate', 'DESC']]
      });
      
      return res.status(200).json({
        success: true,
        data: evaluations
      });
    } catch (error) {
      console.error('Get evaluations by member error:', error);
      return res.status(500).json({
        success: false,
        message: 'サーバーエラーが発生しました'
      });
    }
  }

  // 評価者別の評価一覧取得
  public async getEvaluationsByUser(req: Request, res: Response): Promise<Response> {
    try {
      const { userId } = req.params;
      const evaluations = await MemberEvaluation.findAll({
        where: { userId },
        include: [
          { model: Member, attributes: ['id', 'name', 'position'] },
          { model: User, attributes: ['id', 'name', 'email'] }
        ],
        order: [['evaluationDate', 'DESC']]
      });
      
      return res.status(200).json({
        success: true,
        data: evaluations
      });
    } catch (error) {
      console.error('Get evaluations by user error:', error);
      return res.status(500).json({
        success: false,
        message: 'サーバーエラーが発生しました'
      });
    }
  }

  // 要員評価詳細取得
  public async getEvaluationById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const evaluation = await MemberEvaluation.findByPk(id, {
        include: [
          { model: Member, attributes: ['id', 'name', 'position', 'email', 'phone'] },
          { model: User, attributes: ['id', 'name', 'email'] }
        ]
      });
      
      if (!evaluation) {
        return res.status(404).json({
          success: false,
          message: '評価が見つかりません'
        });
      }

      return res.status(200).json({
        success: true,
        data: evaluation
      });
    } catch (error) {
      console.error('Get evaluation by id error:', error);
      return res.status(500).json({
        success: false,
        message: 'サーバーエラーが発生しました'
      });
    }
  }

  // 要員評価新規作成
  public async createEvaluation(req: Request, res: Response): Promise<Response> {
    try {
      const evaluationData = req.body;
      
      // 要員の存在確認
      const member = await Member.findByPk(evaluationData.memberId);
      if (!member) {
        return res.status(404).json({
          success: false,
          message: '要員が見つかりません'
        });
      }
      
      // ユーザーの存在確認
      const user = await User.findByPk(evaluationData.userId);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'ユーザーが見つかりません'
        });
      }
      
      const newEvaluation = await MemberEvaluation.create(evaluationData);
      
      return res.status(201).json({
        success: true,
        message: '評価を登録しました',
        data: newEvaluation
      });
    } catch (error) {
      console.error('Create evaluation error:', error);
      return res.status(500).json({
        success: false,
        message: 'サーバーエラーが発生しました'
      });
    }
  }

  // 要員評価更新
  public async updateEvaluation(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const evaluationData = req.body;
      
      const evaluation = await MemberEvaluation.findByPk(id);
      if (!evaluation) {
        return res.status(404).json({
          success: false,
          message: '評価が見つかりません'
        });
      }
      
      await evaluation.update(evaluationData);
      
      return res.status(200).json({
        success: true,
        message: '評価情報を更新しました',
        data: evaluation
      });
    } catch (error) {
      console.error('Update evaluation error:', error);
      return res.status(500).json({
        success: false,
        message: 'サーバーエラーが発生しました'
      });
    }
  }

  // 要員評価削除
  public async deleteEvaluation(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      
      const evaluation = await MemberEvaluation.findByPk(id);
      if (!evaluation) {
        return res.status(404).json({
          success: false,
          message: '評価が見つかりません'
        });
      }
      
      await evaluation.destroy();
      
      return res.status(200).json({
        success: true,
        message: '評価を削除しました'
      });
    } catch (error) {
      console.error('Delete evaluation error:', error);
      return res.status(500).json({
        success: false,
        message: 'サーバーエラーが発生しました'
      });
    }
  }
}

export default new MemberEvaluationController();
