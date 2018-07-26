const localize = (keyWord) => {
  const spnTanslations = {};
  const engTranslations = {};
  const ruTranslations = {
    teacher: 'Учитель',
    student: 'Студент',
    admin: 'Администратор',
    studentGroupAddition: 'Студент добавлен в группу',
    studentGroupRemove: 'Студент удален из группы',
    groupCreation: 'Добавлена группа студентов',
    studentTaskAssignment: 'Назначена задача студенту',
    groupTaskAssignment: 'Назначена задача группе',
    studentTestAssignment: 'Назначен тест студенту',
    groupTestAssignment: 'Назначен тест группе',
    studentTaskSending: 'Стуент отправил решение задачи',
    studentTestComplete: 'Студент прошел тест',
    teacherTestCheck: 'Учитель проверил тест',
    studentQuestionComplaint: 'Студент пожаловался на вопрос',
    teacherQuestionCreation: 'Учитель создал вопрос',
    adminQuestionCreation: 'Администратор создал вопрос',
    teacherTaskCreation: 'Учитель создал задачу',
    adminTaskCreation: 'Администратор создал задачу',
    teacherQuestionBlock: 'Учитель заблокировал вопрос',
    adminQuestionBlock: 'Администратор заблокировал вопрос',
    teacherRightsToStudentDelegation: 'Студенту переданы права учителя',
    adminRightsToStudentDelegation: 'Студенту переданы права администратора',
    adminRightsToTeacherDelegation: 'Учителю переданы права администратора',
    name: 'Имя',
    type: 'Тип активности',
    userType: 'Роль',
    date: 'Дата / Время',
    tasksTop: 'Лучшие по задачам',
    testsTop: 'Лучшие по тестам',
    activitiesTop: 'Лучшие по активности',
    marksTop: 'Лучшие по оценкам',
  };

  const dictionaries = {
    ru: ruTranslations,
    'ru-RU': ruTranslations,
    en: engTranslations,
    spn: spnTanslations,
  };

  const langToWords = (lang) => {
    return dictionaries[lang()] || null;
  };


  function findOutLang() {
    return window.navigator.language;
  }

  const currentDictionary = langToWords(findOutLang);
  return currentDictionary ? currentDictionary[keyWord] || keyWord : keyWord;
};

export default localize;
