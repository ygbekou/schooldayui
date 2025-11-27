export class StudentTuitionView {
	studentId: number;
	tuitionId: number;

	studentUserId: number;
	studentFirstName: string
	studentLastName: string
	studentMiddleName: string
	studentMatricule: string
	studentEmail: string
	studentPhone: string

	fatherUserId: number;
	fatherFirstName: string
	fatherLastName: string
	fatherMiddleName: string
	fatherMatricule: string
	fatherEmail: string
	fatherPhone: string

	motherUserId: number;
	motherFirstName: string
	motherLastName: string
	motherMiddleName: string
	motherMatricule: string
	motherEmail: string
	motherPhone: string

	tutorUserId: number;
	tutorFirstName: string
	tutorLastName: string
	tutorMiddleName: string
	tutorMatricule: string
	tutorEmail: string
	tutorPhone: string

	typeName: string
	dueDate: Date
	remindDate: Date
	amount: number;
	paid: number;
	rebate: number;
	balance: number;

	schoolYearId: number;
	schoolYear: string
}