import { Subject } from './subject';
import { Teacher } from './teacher';

export class Course {
    code: number;
    ordinal; number;
    year: number;
    subject: Subject;
    teacher: Teacher;
    section: number;
    average: number;
    stddev: number;
    aproved: boolean;
    reproved: boolean;
}
