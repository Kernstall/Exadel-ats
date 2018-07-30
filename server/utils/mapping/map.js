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
  name: `${model.lastName} ${model.firstName} ${model.fathersName}`,
  email: model.email,
  university: model.university,
  numberTestsToCheck: model.testsToCheck.length,
});
const mapStudentsToDto = model => ({
  name: `${model.lastName} ${model.firstName}`,
  universityInfo: `${model.university} ${model.faculty} ${model.graduateYear}`,
  mediumTaskScore: model.mediumTaskScore,
  mediumTestScore: model.mediumTestScore,
});

module.exports.mapStudentToDto = mapStudentToDto;
module.exports.mapTaskToDto = mapTaskToDto;
module.exports.mapGroupToDto = mapGroupToDto;
module.exports.mapTaskAndTestsToDto = mapTaskAndTestsToDto;
module.exports.mapTeachersToDto = mapTeachersToDto;
module.exports.mapStudentsToDto = mapStudentsToDto;
