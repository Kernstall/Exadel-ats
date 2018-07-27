import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddCircle from '@material-ui/icons/AddCircle';
import TextField from '@material-ui/core/TextField';
import { Typography } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Chip from '@material-ui/core/Chip';
import Icon from '@material-ui/core/Icon';
import DoneIcon from '@material-ui/icons/Done';
import { connect } from 'react-redux';
import Spinner from '../shared/spinner/index';
import TestsBar from './TestsBar';

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
});

class TeacherTaskEdit extends React.Component {
  constructor() {
    super();
    this.id = '';
    this.state = {
      tags: ['БГУ', 'Последовательность', 'Василенко', 'ФПМИ'],
      tagToAdd: '',
      tests: [
        {
          input: 'ПЕРВЫЙ ИН\n3\n3\n3',
          output: 'ПЕРВЫЙ АУТ\n3\nkgkg',
          testId: '2a8fb217bca14f2caf77245541ffb6e6',
        },
        {
          input: 'ВТОРОЙ ИН\n3\n3\n3',
          output: 'ВТОРОЙ АУТ\n3\nfdkgkg',
          testId: 'e15e855cb06d433d90110b538b9246ee',
        },
        {
          input: 'ТРЕТИЙ ИН\n3\nfdf3\n3',
          output: 'ТРЕТИЙ АУТ\ndfdsf3\nkgkg',
          testId: 'b3676a01f5204d27ae0330e39fa69cd4',
        },
      ],
    };
    this.handleDelete = data => () => {
      this.setState((state) => {
        const tags = state.tags;
        const tagToDelete = tags.indexOf(data);
        tags.splice(tagToDelete, 1);
        return { tags };
      });
    };
    this.handleClick = data => () => {
      this.setState((state) => {
        const tags = state.tags;
        tags.push(data);
        const tagToAdd = '';
        return { tags, tagToAdd };
      });
    };
    this.handleChange = () => () => {
      this.setState({
        tagToAdd: this.input.value,
      });
    };
  }

  uuidv4 = function () {
    return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  handleClickAddTest = () => {
    const { tests } = this.state;
    const pushedTest = { input: '', output: '' };
    pushedTest.isNew = true;
    pushedTest.testId = this.uuidv4();
    tests.push(pushedTest);
    this.setState({ tests });
  }

  render() {
    const { classes, match } = this.props;
    const { tests, tagToAdd, tags } = this.state;
    this.id = match.params.id;
    const text = 'Тот, кто писал эту программу, явно делал это в спешке.. На самом деле, нет: программа-то учебная, и этот кто-то нарочно запихнул туда лишние переменные, а те, что надо, не объявил. Исправляем ситуацию: лишние переменные закомментируем, а недостающие — объявим. И наступит тогда в программе всеобщая гармония.';
    const data = '1\n2\n3\n4\n2\n3\n4\n2\n3';
    return (
      <div className={classes.root}>
        <div className={classes.main}>
          <TextField
            defaultValue={text}
            label="Условие"
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
          />
          <div className={classes.infoUpload}>
            <Typography className={classes.infoUploadTitle} variant="subheading">Пример входного файла</Typography>
            <input
              className={classes.input}
              id="contained-button-file"
              multiple
              type="file"
            />
            <label htmlFor="contained-button-file">
              <Button variant="contained" component="span" color="default" className={classes.button}>
                Загрузить<CloudUploadIcon className={classes.rightIcon} />
              </Button>
            </label>
          </div>
          <TextField
            defaultValue={data}
            multiline={true}
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
          <div className={classes.infoUpload}>
            <Typography className={classes.infoUploadTitle} variant="subheading">Пример выходного файла</Typography>
            <input
              accept="text/plane"
              className={classes.input}
              id="contained-button-file"
              multiple
              type="file"
            />
            <label htmlFor="contained-button-file">
              <Button variant="contained" component="span" color="default" className={classes.button}>
                Загрузить<CloudUploadIcon className={classes.rightIcon} />
              </Button>
            </label>
          </div>
          <TextField
            defaultValue={data}
            multiline={true}
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
          <div className={classes.tagsTitleAndInput}>
            <Typography variant="subheading" className={classes.tagsTitle}>Теги</Typography>
            <TextField
              placeholder="Новый тег"
              inputRef={el => this.input = el}
              onChange={this.handleChange()}
              value={tagToAdd}
              InputProps={{
                disableUnderline: true,
                classes: { input: classes.bootstrapInputTag },
              }}
              inputProps={{ maxLength: 20 }}
            />
            <AddCircle
              className={classes.addButton}
              onClick={this.handleClick(tagToAdd)}
            />
          </div>
          <div>
            {tags.map((element, index) => (
              <Chip
                key={index}
                label={element}
                onDelete={this.handleDelete(element)}
                className={classes.chip}
              />
            ))}
          </div>
          <TestsBar
            handleClickAddTest={this.handleClickAddTest}
            tests={tests}
          />
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
