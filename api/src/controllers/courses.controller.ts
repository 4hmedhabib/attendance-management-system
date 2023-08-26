import { NextFunction, Request, Response } from "express";
import {
  DeleteCourseBySlugDto,
  GetCourseBySlugDto,
  GetCoursesDto,
  UpdateCourseDto,
} from "../dtos";
import {
  ICourse,
  IRBCreateCourse,
  IRPCreateCoursePayload,
} from "../interfaces";
import { CourseService } from "../services";

class CourseController {
  public course = new CourseService();

  public getCourses = async (
    req: Request<any, any, GetCoursesDto>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const isMiniView = req.body.payload.isMiniView;
      const filters = req.body.payload.filters;

      const findAllCoursesData: ICourse[] = await this.course.findAllCourse(
        isMiniView,
        filters
      );

      res.status(200).json({
        data: findAllCoursesData,
        message: "Courses Successfully loaded!",
      });
    } catch (error) {
      next(error);
    }
  };

  public getCourseBySlug = async (
    req: Request<any, any, GetCourseBySlugDto>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const courseSlug = req.body.payload.courseSlug;
      const isMiniView = req.body.payload.isMiniView;

      const findOneCourseData: ICourse = await this.course.findCourseBySlug(
        courseSlug,
        isMiniView
      );

      res.status(200).json({
        data: findOneCourseData,
        message: "Course successfully loaded",
      });
    } catch (error) {
      next(error);
    }
  };

  public createCourse = async (
    req: Request<any, any, IRBCreateCourse>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const courseData: IRPCreateCoursePayload = req.body.payload;

      const createCourseData: ICourse = await this.course.createCourse(
        req,
        courseData
      );

      res.status(201).json({
        data: createCourseData,
        message: "Course successfully created",
      });
    } catch (error) {
      next(error);
    }
  };

  public updateCourse = async (
    req: Request<any, any, UpdateCourseDto>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const courseSlug = req.body.payload.courseSlug;
      const courseData = req.body.payload.data;

      const updateCourseData: ICourse = await this.course.updateCourse(
        courseSlug,
        courseData
      );

      res.status(200).json({
        data: updateCourseData,
        message: "Course successfully updated",
      });
    } catch (error) {
      next(error);
    }
  };

  public deleteCourse = async (
    req: Request<any, any, DeleteCourseBySlugDto>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const courseSlug = req.body.payload.courseSlug;

      const deleteCourseData: ICourse = await this.course.deleteCourse(
        courseSlug
      );

      res.status(200).json({
        data: deleteCourseData,
        message: "Course successfully deleted",
      });
    } catch (error) {
      next(error);
    }
  };
}

export default CourseController;
