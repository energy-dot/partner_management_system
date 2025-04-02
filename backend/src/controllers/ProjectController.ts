import { Request, Response } from 'express';
import Project from '../models/Project';

// 案件コントローラー
class ProjectController {
  // 案件一覧取得
  public async getAllProjects(req: Request, res: Response): Promise<Response> {
    try {
      const projects = await Project.findAll();
      return res.status(200).json({
        success: true,
        data: projects
      });
    } catch (error) {
      console.error('Get all projects error:', error);
      return res.status(500).json({
        success: false,
        message: 'サーバーエラーが発生しました'
      });
    }
  }

  // 案件詳細取得
  public async getProjectById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const project = await Project.findByPk(id);
      
      if (!project) {
        return res.status(404).json({
          success: false,
          message: '案件が見つかりません'
        });
      }

      return res.status(200).json({
        success: true,
        data: project
      });
    } catch (error) {
      console.error('Get project by id error:', error);
      return res.status(500).json({
        success: false,
        message: 'サーバーエラーが発生しました'
      });
    }
  }

  // 案件新規作成
  public async createProject(req: Request, res: Response): Promise<Response> {
    try {
      const projectData = req.body;
      const newProject = await Project.create(projectData);
      
      return res.status(201).json({
        success: true,
        message: '案件を登録しました',
        data: newProject
      });
    } catch (error) {
      console.error('Create project error:', error);
      return res.status(500).json({
        success: false,
        message: 'サーバーエラーが発生しました'
      });
    }
  }

  // 案件更新
  public async updateProject(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const projectData = req.body;
      
      const project = await Project.findByPk(id);
      if (!project) {
        return res.status(404).json({
          success: false,
          message: '案件が見つかりません'
        });
      }
      
      await project.update(projectData);
      
      return res.status(200).json({
        success: true,
        message: '案件情報を更新しました',
        data: project
      });
    } catch (error) {
      console.error('Update project error:', error);
      return res.status(500).json({
        success: false,
        message: 'サーバーエラーが発生しました'
      });
    }
  }

  // 案件削除
  public async deleteProject(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      
      const project = await Project.findByPk(id);
      if (!project) {
        return res.status(404).json({
          success: false,
          message: '案件が見つかりません'
        });
      }
      
      await project.destroy();
      
      return res.status(200).json({
        success: true,
        message: '案件を削除しました'
      });
    } catch (error) {
      console.error('Delete project error:', error);
      return res.status(500).json({
        success: false,
        message: 'サーバーエラーが発生しました'
      });
    }
  }
}

export default new ProjectController();
