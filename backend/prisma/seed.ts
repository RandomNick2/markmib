import { LessonType, PrismaClient, UserRole } from '@prisma/client';
import { genSalt, hash } from 'bcrypt';

const prisma = new PrismaClient();

type SeedUserInput = {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  groupId?: number;
};

type GradeValueMap = Record<string, string[]>;

async function hashPassword(password: string) {
  const salt = await genSalt(10);
  return hash(password, salt);
}

async function upsertUser(input: SeedUserInput) {
  const hashedPassword = await hashPassword(input.password);

  return prisma.user.upsert({
    where: { username: input.username },
    update: {
      password: hashedPassword,
      firstName: input.firstName,
      lastName: input.lastName,
      role: input.role,
      groupId: input.groupId,
      isActive: true,
    },
    create: {
      username: input.username,
      password: hashedPassword,
      firstName: input.firstName,
      lastName: input.lastName,
      role: input.role,
      groupId: input.groupId,
      isActive: true,
    },
  });
}

async function upsertLesson(journalId: number, name: string, type: LessonType) {
  const existing = await prisma.lesson.findFirst({
    where: { journalId, name },
  });

  if (existing) {
    return prisma.lesson.update({
      where: { id: existing.id },
      data: { type, name },
      include: { grades: true },
    });
  }

  return prisma.lesson.create({
    data: { journalId, name, type },
    include: { grades: true },
  });
}

async function upsertGrade(
  journalId: number,
  lessonId: number,
  studentId: number,
  value: string,
) {
  const existing = await prisma.grade.findFirst({
    where: { lessonId, studentId },
  });

  if (existing) {
    return prisma.grade.update({
      where: { id: existing.id },
      data: { value, journalId },
    });
  }

  return prisma.grade.create({
    data: {
      journalId,
      lessonId,
      studentId,
      value,
    },
  });
}

async function createJournalWithData(params: {
  name: string;
  teacherId: number;
  groupId: number;
  lessons: { name: string; type: LessonType }[];
  gradeValues: GradeValueMap;
  students: { username: string; id: number }[];
}) {
  const journal = await prisma.journal.upsert({
    where: { name: params.name },
    update: {
      teacherId: params.teacherId,
      groupId: params.groupId,
    },
    create: {
      name: params.name,
      teacherId: params.teacherId,
      groupId: params.groupId,
    },
  });

  const lessonMap = new Map<string, { id: number; type: LessonType }>();

  for (const lesson of params.lessons) {
    const createdLesson = await upsertLesson(journal.id, lesson.name, lesson.type);
    lessonMap.set(lesson.name, { id: createdLesson.id, type: createdLesson.type });
  }

  for (const student of params.students) {
    const values = params.gradeValues[student.username];
    if (!values) continue;

    for (let index = 0; index < params.lessons.length; index++) {
      const lesson = params.lessons[index];
      const lessonRecord = lessonMap.get(lesson.name);
      const value = values[index];

      if (!lessonRecord || value === undefined) continue;

      await upsertGrade(journal.id, lessonRecord.id, student.id, value);
    }
  }

  return journal;
}

async function main() {
  const qualificationApplied = await prisma.qualification.upsert({
    where: { name: 'Прикладной бакалавр' },
    update: {},
    create: { name: 'Прикладной бакалавр' },
  });

  const qualificationTechnician = await prisma.qualification.upsert({
    where: { name: 'Техник-программист' },
    update: {},
    create: { name: 'Техник-программист' },
  });

  const specialitySoftware = await prisma.speciality.upsert({
    where: { name: 'Программное обеспечение' },
    update: {},
    create: { name: 'Программное обеспечение' },
  });

  const specialityAccounting = await prisma.speciality.upsert({
    where: { name: 'Учет и аудит' },
    update: {},
    create: { name: 'Учет и аудит' },
  });

  const groupPob21 = await prisma.group.upsert({
    where: { name: 'ПОБ-21' },
    update: {
      specialityId: specialitySoftware.id,
      qualificationId: qualificationTechnician.id,
    },
    create: {
      name: 'ПОБ-21',
      specialityId: specialitySoftware.id,
      qualificationId: qualificationTechnician.id,
    },
  });

  const groupUa11 = await prisma.group.upsert({
    where: { name: 'УА-11' },
    update: {
      specialityId: specialityAccounting.id,
      qualificationId: qualificationApplied.id,
    },
    create: {
      name: 'УА-11',
      specialityId: specialityAccounting.id,
      qualificationId: qualificationApplied.id,
    },
  });

  const admin = await upsertUser({
    username: 'admin',
    password: 'admin123',
    firstName: 'System',
    lastName: 'Admin',
    role: UserRole.ADMIN,
  });

  const teacherAidar = await upsertUser({
    username: 'aidar.teacher',
    password: 'teacher123',
    firstName: 'Айдар',
    lastName: 'Сериков',
    role: UserRole.TEACHER,
  });

  const teacherAruzhan = await upsertUser({
    username: 'aruzhan.teacher',
    password: 'teacher123',
    firstName: 'Аружан',
    lastName: 'Касымова',
    role: UserRole.TEACHER,
  });

  const studentNursultan = await upsertUser({
    username: 'nursultan.student',
    password: 'student123',
    firstName: 'Нурсултан',
    lastName: 'Ибраев',
    role: UserRole.STUDENT,
    groupId: groupPob21.id,
  });

  const studentAmina = await upsertUser({
    username: 'amina.student',
    password: 'student123',
    firstName: 'Амина',
    lastName: 'Тлеубек',
    role: UserRole.STUDENT,
    groupId: groupPob21.id,
  });

  const studentDias = await upsertUser({
    username: 'dias.student',
    password: 'student123',
    firstName: 'Диас',
    lastName: 'Омаров',
    role: UserRole.STUDENT,
    groupId: groupPob21.id,
  });

  const studentAigerim = await upsertUser({
    username: 'aigerim.student',
    password: 'student123',
    firstName: 'Айгерим',
    lastName: 'Смагулова',
    role: UserRole.STUDENT,
    groupId: groupUa11.id,
  });

  const studentMadi = await upsertUser({
    username: 'madi.student',
    password: 'student123',
    firstName: 'Мади',
    lastName: 'Жакупов',
    role: UserRole.STUDENT,
    groupId: groupUa11.id,
  });

  await createJournalWithData({
    name: 'Алгоритмы и структуры данных',
    teacherId: teacherAidar.id,
    groupId: groupPob21.id,
    lessons: [
      { name: '2026-09-01', type: LessonType.DEFAULT },
      { name: '2026-09-08', type: LessonType.RO },
      { name: '2026-09-15', type: LessonType.RO },
      { name: '2026-09-22', type: LessonType.EXAM },
    ],
    gradeValues: {
      'nursultan.student': ['95', '90', '92', '94'],
      'amina.student': ['88', '85', '89', '91'],
      'dias.student': ['76', '80', '78', '82'],
    },
    students: [studentNursultan, studentAmina, studentDias],
  });

  await createJournalWithData({
    name: 'Базы данных',
    teacherId: teacherAidar.id,
    groupId: groupPob21.id,
    lessons: [
      { name: '2026-09-03', type: LessonType.DEFAULT },
      { name: '2026-09-10', type: LessonType.RO },
      { name: '2026-09-17', type: LessonType.RO },
      { name: '2026-09-24', type: LessonType.EXAM },
    ],
    gradeValues: {
      'nursultan.student': ['91', '90', '93', '95'],
      'amina.student': ['87', '88', '86', '90'],
      'dias.student': ['79', '75', '81', '80'],
    },
    students: [studentNursultan, studentAmina, studentDias],
  });

  await createJournalWithData({
    name: 'Финансовый учет',
    teacherId: teacherAruzhan.id,
    groupId: groupUa11.id,
    lessons: [
      { name: '2026-09-02', type: LessonType.DEFAULT },
      { name: '2026-09-09', type: LessonType.RO },
      { name: '2026-09-16', type: LessonType.RO },
      { name: '2026-09-23', type: LessonType.EXAM },
    ],
    gradeValues: {
      'aigerim.student': ['93', '95', '94', '96'],
      'madi.student': ['84', '82', '86', '85'],
    },
    students: [studentAigerim, studentMadi],
  });

  console.log(
    `Seed completed: admin=${admin.username}, groups=2, teachers=2, students=5, journals=3`,
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
