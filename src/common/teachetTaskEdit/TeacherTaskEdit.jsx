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
import MenuItem from '@material-ui/core/MenuItem';
import TestsBar from './TestsBar';
import generateRandomId from '../../util/generateRandomId';
import TestSet from './TestSet';
import TestField from './TestField';

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

let fileInputReader;
let fileOutputReader;

class TeacherTaskEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params.id,
      tags: [],
      tagToAdd: '',
      weightBuffer: 0,
      tests: new FormData(),
      renderTests: [],
      sendingData: new FormData(),
      weight: 0,
      language: '',
      description: '',
      tests2: [],
      passResult: '',
      name: '',
      topicId: '',
      testsIdsToDelete: [],
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
    const tags = this.state.tags;
    tags.push(data);
    const tagToAdd = '';
    this.setState({ tags, tagToAdd });
  };

  handleClickAddTest = (e) => {
    const { renderTests } = this.state;
    const pushedTest = { input: 'input', output: 'output' };
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
    const { tests2 } = this.state;
    tests2.forEach((el) => {
      if (el.id === id) {
        el.weight = e.target.value;
      }
    });
    this.setState({ tests2 });
  };

  componentDidMount() {
    fetch(`/api/teacher/full/task?id=${this.props.match.params.id}`, {
      method: 'get',
      headers: {
        'Content-type': 'application/json',
        'Set-Cookie': 'true',
      },
      credentials: 'include',
    })
      .then(res => res.json())
      .then((res) => {
        console.log(res);
        return res;
      })
      .then((res) => {
        this.setState({
          tags: res.tags,
          renderTests: res.tests,
          weight: res.weight,
          description: res.description,
          name: res.name,
          topicId: res.topicId,
          passResult: res.passResult,
          language: res.language,
        });
        return res;
      });
  }

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
      testsIdsToDelete: this.state.testsIdsToDelete,
    };
    sendingData.append('taskInfo', JSON.stringify(send));
    fetch(`/api/teacher/task/editing?id=${this.state.id}`, {
      method: 'put',
      body: sendingData,
      headers: {
        'Set-Cookie': 'true',
      },
      credentials: 'include',
    })
      .then(res => console.log(res));
  };

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
    const { tests } = this.state;
    const id = e.target.closest('.test-upload').id;
    const { sendingData } = this.state;
    sendingData.append('tests', selectedFile, `${id}input.txt`);
    tests.append('tests', selectedFile, `${id}${selectedFile.name}`);
    this.setState({ tests, sendingData });
  }

  handleTestsOutputUpload(e) {
    const selectedFile = e.target.files[0];
    const { tests } = this.state;
    const id = e.target.closest('.test-upload').id;
    const { sendingData } = this.state;
    sendingData.append('tests', selectedFile, `${id}output.txt`);
    tests.append('tests', selectedFile, `${id}${selectedFile.name}`);
    this.setState({ tests, sendingData });
  }

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
          <form className={classes.infoUpload}>
            <Typography className={classes.infoUploadTitle} variant="subheading">Пример входного файла</Typography>
            <input
              className={classes.input}
              id="contained-button-input-file"
              multiple
              type="file"
              onChange={event => this.handleInputFileRead(event.target.files[0])}
            />
            <label htmlFor="contained-button-input-file">
              <Button variant="contained" component="span" color="default" className={classes.button}>
                Загрузить<CloudUploadIcon className={classes.rightIcon} />
              </Button>
            </label>
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
            <label htmlFor="contained-button-output-file">
              <Button variant="contained" component="span" color="default" className={classes.button}>
                Загрузить<CloudUploadIcon className={classes.rightIcon} />
              </Button>
            </label>
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
              {this.state.renderTests.map(element => (
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
                    label="Select"
                    className={classes.textField}
                    value={this.state.mark}
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

TeacherTaskEdit.propTypes = {
  classes: PropTypes.object.isRequired,
};
TeacherTaskEdit.contextTypes = {
  router: PropTypes.object,
};

export default (withStyles(styles)(TeacherTaskEdit));
