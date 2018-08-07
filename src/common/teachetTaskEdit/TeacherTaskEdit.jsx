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
import TestsBar from './TestsBar';
import generateRandomId from '../../util/generateRandomId';

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
      tests: [],
      weight: 0,
      description: '',
      name: '',
      file: new FormData(),
    };

    this.handleTestsUpload = this.handleTestsUpload.bind(this);

    this.handleDelete = data => () => {
      this.setState((state) => {
        const tags = state.tags;
        const tagToDelete = tags.indexOf(data);
        tags.splice(tagToDelete, 1);
        return { tags };
      });
    };
  }

  componentDidUpdate() {
    console.log(this.state);
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
    const { tests } = this.state;
    const pushedTest = { input: 'null', output: 'null' };
    pushedTest.isNew = true;
    pushedTest._id = generateRandomId();
    tests.push(pushedTest);
    this.setState({ tests });
  };

  handleChange = name => (e) => {
    this.setState({
      [name]: e.target.value,
    });
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
        this.setState({
          tags: res.tags,
          tests: res.tests,
          weight: res.weight,
          description: res.description,
          name: res.name,
        });
        return res;
      })
      .then(console.log);
  }

  _handleInputReading = (e) => {
    const content = fileInputReader.result;
    const { tests } = this.state;
    tests[0].input = content;
    this.setState({
      tests,
    });
  };

  handleInputFileRead = (file) => {
    console.log('in', file);
    fileInputReader = new FileReader();
    const formData = new FormData();
    formData.append('tests', file, `${[]}`);
    console.log(formData.get('tests'));
    fileInputReader.onloadend = this._handleInputReading;
    fileInputReader.readAsText(file);
  };

  _handleOutputReading = (e) => {
    const content = fileOutputReader.result;
    const { tests } = this.state;
    tests[0].output = content;
    this.setState({
      tests,
    });
  };

  handleOutputFileRead = (file) => {
    console.log('out', file);
    fileOutputReader = new FileReader();
    fileOutputReader.onloadend = this._handleOutputReading;
    fileOutputReader.readAsText(file);
  };

  handleTestsUpload(e) {
    const selectedFile = e.target.files[0];
    const { file } = this.state;
    file.append('test', file, );
  }

  render() {
    const { classes } = this.props;
    const { tagToAdd } = this.state;
    const inputExample = (typeof this.state.tests[0] === 'undefined') ? 'val' : this.state.tests[0].input;
    const outputExample = (typeof this.state.tests[0] === 'undefined') ? 'val' : this.state.tests[0].output;
    return (
      <div className={classes.root}>
        <div className={classes.main}>
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
          <TestsBar
            handleTestsUpload={this.handleTestsUpload}
            handleClickAddTest={this.handleClickAddTest}
            tests={this.state.tests}
          />
          <div className={classes.buttonContainer}>
            <Button variant="contained" color="primary" className={classes.button}>
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
