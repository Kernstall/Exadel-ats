const mapStudentToDto = model => ({
  id: model._id,
  firstName: model.firstName,
  lastName: model.lastName,
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

module.exports.mapStudentToDto = mapStudentToDto;
module.exports.mapTaskToDto = mapTaskToDto;
