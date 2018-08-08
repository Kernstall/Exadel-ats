exports.mapStudentToDto = model => ({
  id: model._id,
  fullName: `${model.firstName} ${model.lastName}`,
  university: model.university,
  faculty: model.faculty,
  course: model.course,
  groupNumber: model.groupNumber,
  graduateYear: model.graduateYear,
});
exports.mapTaskToDto = model => ({
  taskId: model._id,
  taskName: model.name,
  score: model.weight,
  tags: model.tags,
});
exports.mapGroupToDto = model => ({
  id: model.id,
  groupName: model.groupName,
  studentsCount: model.studentIdList.length,
  teacherFullName: `${model.lastName} ${model.firstName} ${model.fathersName}`,
});
exports.mapTaskAndTestsToDto = (model, input, output) => ({
  name: model.name,
  weight: model.weight,
  description: model.description,
  tags: model.tags,
  input,
  output,
});
exports.mapTeachersToDto = model => ({
  lastName: model.lastName,
  firstName: model.firstName,
  fathersName: model.fathersName,
  email: model.email,
  university: model.university,
  numberTestsToCheck: model.testsToCheck.length,
});
exports.mapStudentsToDto = model => ({
  lastName: model.lastName,
  firstName: model.firstName,
  university: model.university,
  faculty: model.faculty,
  graduateYear: model.graduateYear,
  mediumTaskScore: model.mediumTaskScore,
  mediumTestScore: model.mediumTestScore,
});
exports.mapGroupsToDto = model => ({
  groupName: model.groupName,
  lastName: model.lastName,
  firstName: model.firstName,
  fathersName: model.fathersName,
  studentsCount: model.studentIdList.length,
});
exports.mapTasksToDto = model => ({
  name: model.name,
  score: model.weight,
  language: model.language,
});
exports.mapQuestionsToDto = model => ({
  kind: model.kind,
  difficultyRate: model.difficultyRate,
  isTraining: model.isTraining,
  correctAnswersCount: model.correctAnswersCount,
  wrongAnswersCount: model.wrongAnswersCount,
});
exports.mapGroupForChooseToDto = model => ({
  groupName: model.groupName,
  groupId: model._id,
});
exports.mapUniversityToDto = model => ({
  name: model.shortName,
  faculties: model.faculties,
});
exports.mapFacultyToDto = model => ({
  name: model.shortName,
});
