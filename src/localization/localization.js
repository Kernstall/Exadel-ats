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
    email: 'Почта',
    numberTestsToCheck: 'Тесты для проверки',
    university: 'ВУЗ',
    nameOrEmail: 'Имя или почта ...',
    'without answer option': 'С автоматической проверкой',
    'without answer with verification': 'С ручной проверкой',
    'one answer': 'Один ответ',
    'multiple answers': 'Несколько ответов',
    kind: 'Вариант ответа',
    isTraining: 'Тип',
    difficultyRate: 'Сложность',
    correctPrecent: 'Правильные ответы',
    'Search history by:': 'Искать историю по:',
    'Search groups by:': 'Искать группы по:',
    'Search teachers by:': 'Искать учителей по:',
    'Search students by:': 'Искать студентов по:',
    'Search questions by:': 'Искать вопросы по:',
    'Search tasks by:': 'Искать задачи по:',
    lastName: 'Имя',
    universityInfo: 'Группа',
    mediumTaskScore: 'Средняя оценка по задачам',
    mediumTestScore: 'Средняя оценка по тестам',
    groupName: 'Имя группы',
    teacherName: 'Имя учителя',
    studentsCount: 'Студентов в группе',
    score: 'Сложность задачи',
    language: 'Язык программирования',
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
