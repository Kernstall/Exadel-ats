import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddCircle from '@material-ui/icons/AddCircle';
import TextField from '@material-ui/core/TextField';
import { Typography } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Chip from '@material-ui/core/Chip';
import { Link } from 'react-router-dom';
import Close from '@material-ui/icons/Close';
import MenuItem from '@material-ui/core/es/MenuItem/MenuItem';
import generateRandomId from '../../util/generateRandomId';
import TestField from './TestField';
import FormSelect from '../shared/select';

const marks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    width: '130px',
    marginBottom: '-2px',
    color: '#fff',
    backgroundColor: '#2196f3',
    '&:hover': {
      backgroundColor: '#1b77c5',
    },
  },
  mylink: {
    textDecoration: 'none',
    color: 'white',
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  tagsTitleAndInput: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 10,
  },
  infoUpload: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  infoUploadTitle: {
    color: 'grey',
    display: 'flex',
    marginRight: 10,
  },
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: 20,
  },
  main: {
    boxSizing: 'border-box',
    padding: '20px',
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#F8F8FF',
  },
  tagsTitle: {
    display: 'flex',
    color: 'grey',
  },
  bootstrapRoot: {
    boxSizing: 'border-box',
    display: 'flex',
  },
  bootstrapInput: {
    boxSizing: 'border-box',
    display: 'flex',
    borderRadius: 4,
    backgroundColor: theme.palette.common.white,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 12px',
    width: 'calc(100% - 24px)',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
  bootstrapFormLabel: {
    fontSize: 18,
  },
  testsTitle: {
    display: 'flex',
    justifyContent: 'flex-start',
    color: 'grey',
  },
  testsTitleAndAdd: {
    margin: '10px 0px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  tests: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  uploadFile: {
    color: 'blue',
    marginLeft: 10,
    fontSize: 28,
    cursor: 'pointer',
  },
  addButtonTests: {
    marginLeft: 5,
    color: 'blue',
    fontSize: 26,
    cursor: 'pointer',
  },
  inputOutputTitle: {
    display: 'flex',
    width: '50%',
  },
  testsInfo: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    boxSizing: 'border-box',
    justifyContent: 'space-around',
  },
  bootstrapInputOutput: {
    display: 'flex',
    width: '85%',
  },
  input: {
    display: 'none',
  },
  chip: {
    margin: theme.spacing.unit / 2,
  },
  bootstrapInputTag: {
    borderRadius: 4,
    backgroundColor: theme.palette.common.white,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 12px',
    display: 'flex',
    width: '200px',
    marginLeft: 20,
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
  icon: {
    margin: theme.spacing.unit * 2,
  },
  addButton: {
    marginLeft: 10,
    color: 'blue',
    fontSize: 28,
    cursor: 'pointer',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'flex-end',
    marginTop: 10,
  },
  '@media (max-width: 1200px)': {
    main: {
      width: '70%',
    },
  },
  '@media (max-width: 700px)': {
    main: {
      width: '95%',
    },
  },
  test: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const languagesData = [
  {
    name: 'Java',
    id: 'java',
  },
  {
    name: 'C++',
    id: 'cpp',
  },
];

let fileInputReader;
let fileOutputReader;

class TeacherCreateTask extends React.Component {
  constructor() {
    super();
    this.state = {
      tags: [],
      tagToAdd: '',
      weightBuffer: 0,
      tests: new FormData(),
      renderTests: [],
      sendingData: new FormData(),
      weight: '',
      language: '',
      description: '',
      tests2: [],
      passResult: '',
      name: '',
      topicId: '',
      testsIdsToDelete: [],
      topics: [],
      currentTopic: '',
    };

    this.handleTestsInputUpload = this.handleTestsInputUpload.bind(this);
    this.handleTestsOutputUpload = this.handleTestsOutputUpload.bind(this);

    this.handleDelete = data => () => {
      this.setState((state) => {
        const tags = state.tags;
        const tagToDelete = tags.indexOf(data);
        const testsIdsToDelete = tags.splice(tagToDelete, 1);
        return { tags, testsIdsToDelete };
      });
    };
  }

  handleClick = (data) => {
    if (data.length < 3) {
      return;
    }
    const { tags } = this.state;
    tags.push(data);
    const tagToAdd = '';
    this.setState({ tags, tagToAdd });
  };

  handleClickAddTest = (e) => {
    const { renderTests } = this.state;
    const pushedTest = { input: 'null', output: 'null' };
    pushedTest.isNew = true;
    pushedTest._id = generateRandomId();
    const buff = {};
    buff.id = pushedTest._id;
    buff.weight = 0;
    const { tests2 } = this.state;
    tests2.push(buff);
    renderTests.push(pushedTest);
    this.setState({ renderTests, tests2 });
  };

  handleChange = name => (e) => {
    this.setState({
      [name]: e.target.value,
    });
  };

  handleSetWeight = id => (e) => {
    console.log('handleSetWeight', id, e);
    console.log('e.target.value', e.target.value);
    console.log('test2', this.state.tests2);
    const { tests2 } = this.state;
    tests2.forEach((el) => {
      if (el.id === id) {
        el.weight = e.target.value;
      }
    });
    console.log('test2after', tests2);

    this.setState({ tests2 });
  };

  handleUpload = () => {
    const { sendingData } = this.state;
    const send = {
      topicId: this.state.topicId,
      tags: this.state.tags,
      description: this.state.description,
      name: this.state.name,
      weight: this.state.weight,
      language: this.state.language,
      tests: this.state.tests2,
      passResult: this.state.passResult,
    };
    sendingData.append('taskInfo', JSON.stringify(send));
    fetch('/api/teacher/task/', {
      method: 'post',
      body: sendingData,
      headers: {
        'Set-Cookie': 'true',
      },
      credentials: 'include',
    })
      .then(res => console.log(res));
  };

  componentDidMount() {
    fetch('/api/teacher/all/topics', {
      method: 'GET',
      headers: {
        'Set-Cookie': 'true',
      },
      credentials: 'include',
    })
      .then(res => res.json())
      .then((res) => {
        this.setState({
          topics: res,
        });
      });
  }

  _handleInputReading = (e) => {
    const content = fileInputReader.result;
    const { renderTests } = this.state;
    renderTests[0].input = content;
    this.setState({
      renderTests,
    });
  };

  handleInputFileRead = (file) => {
    fileInputReader = new FileReader();
    const formData = new FormData();
    formData.append('tests', file, `${file.name}`);
    fileInputReader.onloadend = this._handleInputReading;
    fileInputReader.readAsText(file);
  };

  _handleOutputReading = (e) => {
    const content = fileOutputReader.result;
    const { renderTests } = this.state;
    renderTests[0].output = content;
    this.setState({
      renderTests,
    });
  };

  handleOutputFileRead = (file) => {
    fileOutputReader = new FileReader();
    fileOutputReader.onloadend = this._handleOutputReading;
    fileOutputReader.readAsText(file);
  };

  handleTestsInputUpload(e) {
    const selectedFile = e.target.files[0];
    const id = e.target.closest('.test-upload').id;
    const { sendingData } = this.state;
    fileInputReader = new FileReader();
    fileInputReader.onloadend = this._handleInputReading;
    fileInputReader.readAsText(selectedFile);
    sendingData.append('tests', selectedFile, `${id}input.txt`);
    this.setState({ sendingData });
  }

  handleTestsOutputUpload(e) {
    const selectedFile = e.target.files[0];
    const id = e.target.closest('.test-upload').id;
    const { sendingData } = this.state;
    fileOutputReader = new FileReader();
    fileOutputReader.onloadend = this._handleOutputReading;
    fileOutputReader.readAsText(selectedFile);
    sendingData.append('tests', selectedFile, `${id}output.txt`);
    this.setState({ sendingData });
  }

  handleTopicChange = (e) => {
    const topicId = this.state.topics.find(el => el.name === e.target.value)._id;
    this.setState({
      topicId: topicId,
      currentTopic: e.target.value,
    });
  };

  handleClickDeleteTest = (key) => {
    const { renderTests, testsIdsToDelete } = this.state;
    const deleteId = renderTests.findIndex(element => element._id === key);
    testsIdsToDelete.push(key);
    renderTests.splice(deleteId, 1);
    this.setState({ renderTests, testsIdsToDelete });
  };

  render() {
    const { classes } = this.props;
    const { tagToAdd } = this.state;
    const inputExample = (typeof this.state.renderTests[0] === 'undefined') ? 'val' : this.state.renderTests[0].input;
    const outputExample = (typeof this.state.renderTests[0] === 'undefined') ? 'val' : this.state.renderTests[0].output;
    console.log('this.state', this.state);
    return (
      <div className={classes.root}>
        <div className={classes.main}>
          <TextField
            value={this.state.name}
            label="Название задачи"
            onChange={this.handleChange('name')}
            rows={4}
            InputProps={{
              disableUnderline: true,
              classes: {
                root: classes.bootstrapRoot,
                input: classes.bootstrapInput,
              },
            }}
            InputLabelProps={{
              shrink: true,
              className: classes.bootstrapFormLabel,
            }}
          />
          <TextField
            value={this.state.description}
            label="Условие"
            multiline
            onChange={this.handleChange('description')}
            rows={4}
            InputProps={{
              disableUnderline: true,
              classes: {
                root: classes.bootstrapRoot,
                input: classes.bootstrapInput,
              },
            }}
            InputLabelProps={{
              shrink: true,
              className: classes.bootstrapFormLabel,
            }}
          />
          <TextField
            id="select-language"
            select
            label="Язык"
            className={classes.textField}
            value={this.state.language}
            onChange={this.handleChange('language')}
            SelectProps={{
              MenuProps: {
                className: classes.menu,
              },
            }}
            helperText="Выберите язык задачи"
            margin="normal"
          >
            {languagesData.map(option => (
              <MenuItem key={`lang-${option.id}`} value={option.id}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="select-topic"
            select
            label="Тема"
            className={classes.textField}
            value={this.state.currentTopic}
            onChange={this.handleTopicChange}
            SelectProps={{
              MenuProps: {
                className: classes.menu,
              },
            }}
            helperText="Выберите тему задачи"
            margin="normal"
          >
            {this.state.topics.map(option => (
              <MenuItem key={option._id} value={option.name}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="select-currency"
            select
            label="Стоимость задачи"
            className={classes.textField}
            value={this.state.weight}
            onChange={this.handleChange('weight')}
            SelectProps={{
              MenuProps: {
                className: classes.menu,
              },
            }}
            helperText="Выберите стоимость задачи"
            margin="normal"
          >
            {marks.map(option => (
              <MenuItem key={`mark-${option}`} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          {this.state.weight &&
            (
              <TextField
                id="select-pass-result"
                select
                label="Минимальная оценка"
                className={classes.textField}
                value={this.state.passResult}
                onChange={this.handleChange('passResult')}
                SelectProps={{
                  MenuProps: {
                    className: classes.menu,
                  },
                }}
                helperText="Выберите минимальную оценку, необходимую набрать за задачу"
                margin="normal"
              >
                {Array.from(Array(this.state.weight).keys()).map(option => (
                  <MenuItem key={`min-mark-${option}`} value={option + 1}>
                    {option + 1}
                  </MenuItem>
                ))}
              </TextField>
            )
          }
          <form className={classes.infoUpload}>
            <Typography className={classes.infoUploadTitle} variant="subheading">Пример входного файла</Typography>
            <input
              className={classes.input}
              id="contained-button-input-file"
              multiple
              type="file"
              onChange={event => this.handleInputFileRead(event.target.files[0])}
            />
          </form>
          <TextField
            value={inputExample}
            multiline
            rows={4}
            InputProps={{
              disableUnderline: true,
              classes: {
                root: classes.bootstrapRoot,
                input: classes.bootstrapInput,
              },
            }}
            InputLabelProps={{
              shrink: true,
              className: classes.bootstrapFormLabel,
            }}
            onChange={this.handleChange('inputExample')}
          />
          <div className={classes.infoUpload}>
            <Typography className={classes.infoUploadTitle} variant="subheading">Пример выходного файла</Typography>
            <input
              className={classes.input}
              id="contained-button-output-file"
              multiple
              type="file"
              onChange={e => this.handleOutputFileRead(e.target.files[0])}
            />
          </div>
          <TextField
            value={outputExample}
            multiline
            rows={4}
            InputProps={{
              disableUnderline: true,
              classes: {
                root: classes.bootstrapRoot,
                input: classes.bootstrapInput,
              },
            }}
            InputLabelProps={{
              shrink: true,
              className: classes.bootstrapFormLabel,
            }}
            id="result-file-reading"
            onChange={this.handleChange('outputExample')}
          />
          <div className={classes.tagsTitleAndInput}>
            <Typography variant="subheading" className={classes.tagsTitle}>Теги</Typography>
            <TextField
              placeholder="Новый тег"
              inputRef={el => this.input = el}
              onChange={this.handleChange('tagToAdd')}
              value={tagToAdd}
              InputProps={{
                disableUnderline: true,
                classes: { input: classes.bootstrapInputTag },
                maxLength: 20,
              }}
            />
            <AddCircle
              className={classes.addButton}
              onClick={() => this.handleClick(tagToAdd)}
            />
          </div>
          <div>
            {this.state.tags.map((element, index) => (
              <Chip
                key={index}
                label={element}
                onDelete={this.handleDelete(element)}
                className={classes.chip}
              />
            ))}
          </div>
          <div className={classes.root}>
            <div className={classes.testsTitleAndAdd}>
              <Typography variant="subheading" className={classes.testsTitle}>Тесты</Typography>
              <AddCircle
                className={classes.addButtonTests}
                onClick={this.handleClickAddTest}
              />
            </div>
            <div className={classes.tests}>
              <div className={classes.testsInfo}>
                <Typography variant="body2" className={classes.inputOutputTitle}>Input</Typography>
                <Typography variant="body2" className={classes.inputOutputTitle}>Output</Typography>
              </div>
              {this.state.renderTests.map((element, index) => (
                <div className={classes.test}>
                  <TestField
                    handleTestsUpload={this.handleTestsInputUpload}
                    inputText={element.input}
                    isNew={element.isNew}
                    id={`${element._id}1`}
                  />
                  <TestField
                    handleTestsUpload={this.handleTestsOutputUpload}
                    inputText={element.output}
                    isNew={element.isNew}
                    id={`${element._id}2`}
                  />
                  <Close
                    className={classes.deleteButton}
                    onClick={() => this.handleClickDeleteTest(element._id)}
                  />
                  {element.isNew
                    && (
                      <TextField
                        id="select-currency"
                        select
                        label="Стоимость"
                        className={classes.textField}
                        value={this.state.tests2[index].weight}
                        onChange={this.handleSetWeight(element._id)}
                        SelectProps={{
                          MenuProps: {
                            className: classes.menu,
                          },
                        }}
                        helperText="Выберите стоимость теста"
                        margin="normal"
                      >
                        {marks.map(option => (
                          <MenuItem key={`mark-${option}`} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </TextField>
                    )
                  }
                </div>
              ))}
            </div>
          </div>
          <div className={classes.buttonContainer}>
            <Button onClick={this.handleUpload} variant="contained" color="primary" className={classes.button}>
              Сохранить
            </Button>
            <Link to={`/teacher/tasks/${this.state.id}`}>
              <Button variant="contained" color="primary" className={classes.button}>
                Отмена
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

TeacherCreateTask.propTypes = {
  classes: PropTypes.object.isRequired,
};
TeacherCreateTask.contextTypes = {
  router: PropTypes.object,
};

export default (withStyles(styles)(TeacherCreateTask));
