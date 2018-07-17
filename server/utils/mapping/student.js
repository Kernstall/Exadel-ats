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

module.exports.mapStudentToDto = mapStudentToDto;
module.exports.mapTaskToDto = mapTaskToDto;
module.exports.mapGroupToDto = mapGroupToDto;
