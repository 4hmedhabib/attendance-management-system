import { NextFunction, Request, Response } from "express";
import {
  CreateClassSemesterCourseAttendancesDto,
  CreateClassSemesterCoursesDto,
  CreateClassSemesterDto,
  DeleteClassBySlugDto,
  GetClassBySlugDto,
  GetClassSemesterCourseAttendancesDto,
  GetClassSemesterCoursesBySlugDto,
  GetClassSemestersBySlugDto,
  GetClassesDto,
  UpdateClassDto,
  UpdateClassSemesterCourseAttendancePayload,
  UpdateClassSemesterCourseAttendancesDto,
} from "../dtos";
import {
  IAttendances,
  IClass,
  IClassSemester,
  IRBCreateClass,
  IRPCreateClassPayload,
} from "../interfaces/";
import { ClassService } from "../services/";

class ClassController {
  public class = new ClassService();

  public getClasses = async (
    req: Request<any, any, GetClassesDto>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const isMiniView = req.body.payload.isMiniView;

      const findAllClassesData: IClass[] = await this.class.findAllClass(
        isMiniView
      );

      res.status(200).json({
        data: findAllClassesData,
        message: "Classes Successfully loaded!",
      });
    } catch (error) {
      next(error);
    }
  };

  public getClassBySlug = async (
    req: Request<any, any, GetClassBySlugDto>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const classSlug = req.body.payload.classSlug;
      const isMiniView = req.body.payload.isMiniView;

      const findOneClassData: IClass = await this.class.findClassBySlug(
        classSlug,
        isMiniView
      );

      res.status(200).json({
        data: findOneClassData,
        message: "Class successfully loaded",
      });
    } catch (error) {
      next(error);
    }
  };

  public createClass = async (
    req: Request<any, any, IRBCreateClass>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const classData: IRPCreateClassPayload = req.body.payload;

      const createClassData: IClass = await this.class.createClass(classData);

      res.status(201).json({
        data: createClassData,
        message: "Class successfully created",
      });
    } catch (error) {
      next(error);
    }
  };

  public updateClass = async (
    req: Request<any, any, UpdateClassDto>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const classSlug = req.body.payload.classSlug;
      const classData = req.body.payload.data;

      const updateClassData: IClass = await this.class.updateClass(
        classSlug,
        classData
      );

      res.status(200).json({
        data: updateClassData,
        message: "Class successfully updated",
      });
    } catch (error) {
      next(error);
    }
  };

  public deleteClass = async (
    req: Request<any, any, DeleteClassBySlugDto>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const classSlug = req.body.payload.classSlug;

      const deleteClassData: IClass = await this.class.deleteClass(classSlug);

      res.status(200).json({
        data: deleteClassData,
        message: "Class successfully deleted",
      });
    } catch (error) {
      next(error);
    }
  };

  public createClassSemester = async (
    req: Request<any, any, CreateClassSemesterDto>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const createClassSemesterData = await this.class.createClassSemester(
        req.body
      );

      res.status(200).json({
        data: createClassSemesterData,
        message: "Classes Successfully loaded!",
      });
    } catch (error) {
      next(error);
    }
  };

  public getClassSemestersBySlug = async (
    req: Request<any, any, GetClassSemestersBySlugDto>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const classSlug = req.body.payload.classSlug;
      const isMiniView = req.body.payload.isMiniView;

      const findOneClassSemestersData: IClassSemester[] =
        await this.class.findClassSemestersBySlug(classSlug, isMiniView);

      res.status(200).json({
        data: findOneClassSemestersData,
        message: "Class Semesters successfully loaded",
      });
    } catch (error) {
      next(error);
    }
  };

  public createClassSemesterCourses = async (
    req: Request<any, any, CreateClassSemesterCoursesDto>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const createClassSemesterCoursesData =
        await this.class.createClassSemesterCourses(req.body);

      res.status(200).json({
        data: createClassSemesterCoursesData,
        message: "Semester Courses Successfully created!",
      });
    } catch (error) {
      next(error);
    }
  };

  public getClassSemesterCoursesBySlug = async (
    req: Request<any, any, GetClassSemesterCoursesBySlugDto>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const classSlug = req.body.payload.classSlug;
      const semesterSlug = req.body.payload.semesterSlug;
      const isMiniView = req.body.payload.isMiniView;

      const findOneClassSemestersData: IClassSemester[] =
        await this.class.findClassSemesterCoursesBySlug(
          classSlug,
          semesterSlug,
          isMiniView
        );

      res.status(200).json({
        data: findOneClassSemestersData,
        message: "Class Semesters successfully loaded",
      });
    } catch (error) {
      next(error);
    }
  };

  public createClassSemesterCourseAttendances = async (
    req: Request<any, any, CreateClassSemesterCourseAttendancesDto>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const createClassSemesterCourseAttendancesData =
        await this.class.createClassSemesterCourseAttendances(req.body.payload);

      res.status(200).json({
        data: createClassSemesterCourseAttendancesData,
        message: "Course Attendances Successfully created!",
      });
    } catch (error) {
      next(error);
    }
  };

  public getClassSemesterCourseAttendances = async (
    req: Request<any, any, GetClassSemesterCourseAttendancesDto>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const payload = req.body.payload;
      const isMiniView = req.body.payload.isMiniView;

      const findOneClassSemestersData: IAttendances[] =
        await this.class.findClassSemesterCoursesAttendances(
          payload,
          isMiniView
        );

      res.status(200).json({
        data: findOneClassSemestersData,
        message: "Class Semesters successfully loaded",
      });
    } catch (error) {
      next(error);
    }
  };

  public updateClassSemesterCourseAttendances = async (
    req: Request<any, any, UpdateClassSemesterCourseAttendancesDto>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const payload: UpdateClassSemesterCourseAttendancePayload =
        req.body.payload;

      const updateClassSemesterCoursesAttendanceData =
        await this.class.updateClassSemesterCoursesAttendance(payload);

      res.status(200).json({
        data: updateClassSemesterCoursesAttendanceData,
        message: "Attendance Successfully updated!",
      });
    } catch (error) {
      next(error);
    }
  };
}

export default ClassController;
