const mapStudentToDto = model => ({
  id: model._id,
  fullName: `${model.firstName} ${model.lastName}`,
  university: model.university,
  faculty: model.faculty,
  course: model.course,
  groupNumber: model.groupNumber,
  graduateYear: model.graduateYear,
});
const mapTaskToDto = model => ({
  taskId: model._id,
  taskName: model.name,
  score: model.weight,
  tags: model.tags,
});
const mapGroupToDto = model => ({
  groupName: model.groupName,
  studentsCount: model.studentIdList.length,
  teacherFullName: `${model.lastName} ${model.firstName} ${model.fathersName}`,
});
const mapTaskAndTestsToDto = (model, input, output) => ({
  name: model.name,
  weight: model.weight,
  description: model.description,
  tags: model.tags,
  input,
  output,
});
const mapTeachersToDto = model => ({
  lastName: model.lastName,
  firstName: model.firstName,
  fathersName: model.fathersName,
  email: model.email,
  university: model.university,
  numberTestsToCheck: model.testsToCheck.length,
});
const mapStudentsToDto = model => ({
  lastName: model.lastName,
  firstName: model.firstName,
  university: model.university,
  faculty: model.faculty,
  graduateYear: model.graduateYear,
  mediumTaskScore: model.mediumTaskScore,
  mediumTestScore: model.mediumTestScore,
});
const mapGroupsToDto = model => ({
  groupName: model.groupName,
  lastName: model.lastName,
  firstName: model.firstName,
  fathersName: model.fathersName,
  studentsCount: model.studentIdList.length,
});
const mapTasksToDto = model => ({
  name: model.name,
  score: model.weight,
  language: model.language,
});
const mapQuestionsToDto = model => ({
  kind: model.kind,
  difficultyRate: model.difficultyRate,
  isTraining: model.isTraining,
  correntAnswersCount: model.correntAnswersCount,
  wrongAnswersCount: model.wrongAnswersCount,
});

module.exports.mapStudentToDto = mapStudentToDto;
module.exports.mapTaskToDto = mapTaskToDto;
module.exports.mapGroupToDto = mapGroupToDto;
module.exports.mapTaskAndTestsToDto = mapTaskAndTestsToDto;
module.exports.mapTeachersToDto = mapTeachersToDto;
module.exports.mapStudentsToDto = mapStudentsToDto;
module.exports.mapGroupsToDto = mapGroupsToDto;
module.exports.mapTasksToDto = mapTasksToDto;
module.exports.mapQuestionsToDto = mapQuestionsToDto;
