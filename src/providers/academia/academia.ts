import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { Course } from '../../models/course';
import { Student } from '../../models/student';

/*
  Generated class for the AcademiaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class AcademiaProvider {
    backendUrl = "https://api.sebastian.cl/academia/api/v1/"
    constructor(public http: HttpClient) {
        console.log('Hello AcademiaProvider Provider');
    }

    setBackendUrl(newUrl) {
        console.log("newUrl = " + newUrl);
        if (newUrl[newUrl.length - 1] != '/') {
            newUrl = newUrl + '/';
        }
        this.backendUrl = newUrl;
    }

    forgotPassword(rut: string) {
        let url = this.backendUrl + `authentication/forgot/${rut}`;
        return this.http.post(url, {});
    }

    course_stats(subjectCode, year, semester, apiKey) {
        let url = this.backendUrl + 'courses/subject/stats';
        let httpOptions = {
            headers: new HttpHeaders({ 'X-API-KEY': apiKey })
        };
        console.log("ACADEMIA PROVIDER");
        console.log(apiKey);
        let data = {
            subjectCode: subjectCode,
            year: year,
            ordinal: semester
        };
        return this.http.
            post(url, data, httpOptions)
            .pipe(map((d: any) => {
                d = d.map(d => {
                    let teacher = d.course.teacher;
                    return {
                        code: d.course.subject.code,
                        name: d.course.subject.name,
                        year: d.course.year,
                        semester: d.course.ordinal,
                        average: d.average,
                        stddev: d.stddev,
                        aproved: d.aproved,
                        reproved: d.reproved,
                        total: d.aproved + d.reproved,
                        teacherName: `${teacher.firstName} ${teacher.lastName}`
                    }
                });
                return d;
            }));
    }

    teacher_courses_stats(rut: string, apiKey: string) {
        let url = this.backendUrl + `courses/teachers/${rut}/stats`;
        let httpOptions = {
            headers: new HttpHeaders({ 'X-API-KEY': apiKey })
        };
        return this.http
            .get<Course[]>(url, httpOptions)
            .pipe(map((d: any) => {
                d = d.map(d => {
                    let teacher = d.course.teacher;
                    return {
                        code: d.course.subject.code,
                        name: d.course.subject.name,
                        year: d.course.year,
                        semester: d.course.ordinal,
                        average: d.average,
                        stddev: d.stddev,
                        aproved: d.aproved,
                        reproved: d.reproved,
                        total: d.aproved + d.reproved,
                        teacherName: `${teacher.firstName} ${teacher.lastName}`
                    }
                });
                return d;
            }))
    }

    //
    // student_courses_stats(rut: string, apiKey: string) {
    //     let url = this.backendUrl + `courses/students/${rut}/stats`;
    //     let httpOptions = {
    //         headers: new HttpHeaders({ 'X-API-KEY': apiKey})
    //     };
    //     return this.http
    //         .get<Course[]>(url, httpOptions)
    //         .pipe(map((e: any) => {
    //             e = e.map(e => {
    //                 let student = e.course.student;
    //                 return  { code: e.course.subject.code,
    //                           name: e.course.subject.name,
    //                           year: e.course.year,
    //                           semester: e.course.ordinal,
    //                           average: e.average,
    //                           stddev: e.stddev,
    //                           aproved: e.aproved,
    //                           reproved: e.reproved,
    //                           total: e.aproved + e.reproved,
    //                           teacherName: `${student.firstName} ${student.lastName}` }});
    //             return e;
    //         }))
    // }


    getTeacher(rut: string, apiKey: string) {
        let url = this.backendUrl + `teachers/${rut}`;
        let httpOptions = {
            headers: new HttpHeaders({ 'X-API-KEY': apiKey })
        };
        return this.http.get(url, httpOptions);
    }

    //
    getStudent(rut: string, apiKey: string) {
        let url = this.backendUrl + `students/${rut}`;
        let httpOptions = {
            headers: new HttpHeaders({ 'X-API-KEY': apiKey })
        };
        return this.http.get(url, httpOptions);
    }

    student_courses_stats(rut: string, apiKey: string) {
        let url = this.backendUrl + `courses/students/${rut}`;

        let httpOptions = {
            headers: new HttpHeaders({ 'X-API-KEY': apiKey })
        };

        return this.http.get(url, httpOptions);
    }

    //Estadisticos alumno

    // rankingStudent(rut: string, apiKey: string) {
    //     let url = this.backendUrl + `rankings/${rut}/stats`;
    //     let httpOptions = {
    //         headers: new HttpHeaders({ 'X-API-KEY': apiKey })
    //     };
    //     return this.http.get(url, httpOptions).subscribe((data: any) => {
    //     },
    //         error => { }
    //     );
    // }
}
