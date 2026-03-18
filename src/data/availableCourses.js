import { courses } from "./coursesData";
 
// Auto-derived from coursesData.js — no manual maintenance needed.
// To enable a course detail page, set hasDetailPage: true in coursesData.js.
 
export const AVAILABLE_COURSE_SLUGS = new Set(
  courses
    .flatMap((category) => category.subCourses)
    .filter((course) => course.hasDetailPage === true)
    .map((course) => course.slug)
);