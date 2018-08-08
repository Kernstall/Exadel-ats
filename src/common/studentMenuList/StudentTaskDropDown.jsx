import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import CloudDownload from '@material-ui/icons/CloudDownload';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import InputLabel from '@material-ui/core/InputLabel';
import Grid from '@material-ui/core/Grid';
import ListItemText from '@material-ui/core/ListItemText';
import Attempts from './Attempts.jsx';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    userSelect: 'none',
  },
  button: {
    margin: theme.spacing.unit,
    color: '#fff',
    backgroundColor: '#2196f3',
    '&:hover': {
      backgroundColor: '#1b77c5',
    },
  },
  input: {
    display: 'none',
  },
  fullWidth: {
    width: '100%',
  },
  hidden: {
    display: 'none',
  },
  icon: {
    fontSize: '34px',
    marginRight: '20px',
  },
  marginTop: {
    marginTop: 20,
  },
  downloadContainer: {
    marginTop: '20px',
  },
  red: {
    background: 'red',
    marginLeft: '20px',
  },
  green: {
    background: 'green',
    marginLeft: '20px',
  },
  chip: {
    marginLeft: '20px',
  },
});


class StudentTaskDropDown extends React.Component {
  constructor() {
    super();
    this.state = {
      isShowAttempts: false,
      isDownload: false,
      sendingData: new FormData(),
    };
  }

  handleShowAttempts = name => () => {
    const newState = this.state;
    for (const e in newState) {
      if (e !== 'sendingData') {
        newState[e] = e === name ? !newState[name] : false;
      }
    }
    if (name === 'isShowAttempts') {
      this.props.handlerUploadAttempts();
    }
    this.setState(newState);
  };

  handleUpload = () => {
    const { sendingData, mainFile, files } = this.state;
    const { taskId } = this.props;

    files && Array.from(files).forEach(file => sendingData.append('src', file));

    fetch(`/api/student/src/files?mainFile=${mainFile}&taskId=${taskId}`, {
      method: 'POST',
      body: sendingData,
      headers: {
        'Set-Cookie': 'true',
      },
      credentials: 'include',
    })
      .then(res => res.json())
      .then(res => this.setState({ res }));
  };

  handleMainFile = (e) => {
    this.setState({ mainFile: e.target.value });
  }

  handleDownloadAttempt = name => (e) => {
    const fileNames = Array.from(e.target.files).map(e => e.name);
    const files = e.target.files;
    const newState = {
      files,
      fileNames,
    };
    console.log(files);
    this.setState(newState);
  }

  render() {
    const { classes, taskInfo, groupId } = this.props;
    console.log(this.state.res);
    return (
      <div className={classes.fullWidth}>
        <Paper className={classes.root} elevation={1}>
          <Typography variant="headline" component="h3">
            Info
          </Typography>
          <Typography component="p">
            {taskInfo.description}
          </Typography>
          <Button onClick={this.handleShowAttempts('isShowAttempts')} variant="contained" color="primary" className={classes.button}>
            Посмотреть попытки
          </Button>
          <Button onClick={this.handleShowAttempts('isDownload')} variant="contained" color="primary" className={classes.button}>
            Загрузить решение
          </Button>
          {
            (this.state.isShowAttempts && taskInfo.attempts.length > 0)
              && (
              <div className={classes.root}>
                <List
                  component="nav"
                >
                  {
                    taskInfo.attempts.map(
                      (attempt, index) => (
                        <Attempts
                          attempt={attempt}
                          taskId={taskInfo.taskId}
                          key={index}
                        />
                      ),
                    )
                  }
                </List>
              </div>
            )
          }
          {
            this.state.isDownload
            && (
              <div className={classes.root}>
                <Grid>
                  <Typography component="p">
                    Имя главного файла
                  </Typography>
                  <TextField onChange={this.handleMainFile} placeholder="Главный файл..." />
                </Grid>
                <Grid className={classes.marginTop}>
                  <InputLabel>
                    <input onChange={this.handleDownloadAttempt('files')} className={classes.hidden} multiple type="file" />
                    <Typography component="p">
                      Загрузить файлы
                    </Typography>
                    <Grid container className={classes.downloadContainer}>
                      <CloudDownload className={classes.icon} />
                      {this.state.fileNames && this.state.fileNames.map(file => <Chip className={classes.chip} label={`${file}`} />)}
                    </Grid>
                  </InputLabel>
                </Grid>
                <Button onClick={this.handleUpload} variant="contained" color="primary" className={classes.button}>
                  Отправить
                </Button>
                {this.state.res &&
                  (
                    <List>
                      <ListItem>
                        <Typography className={classes.marginTop} component="p">
                          Оценка: <Button size={'small'} className={!this.state.res.isPassed ? classes.red : classes.green}>{this.state.res.result}</Button>
                        </Typography>
                      </ListItem>
                      <ListItem>
                        <Typography className={classes.marginTop} component="p">
                          Тесты:
                        </Typography>
                      </ListItem>

                      <List>
                        <Grid container>
                          <ListItem>
                            <Grid item xs={5}>
                              <ListItemText>
                                #
                              </ListItemText>
                            </Grid>
                            <Grid item xs={5}>
                              <ListItemText>
                                Вес теста
                              </ListItemText>
                            </Grid>
                            <Grid item xs={2}>
                              <ListItemText>
                                Статус теста
                              </ListItemText>
                            </Grid>
                          </ListItem>
                        </Grid>
                        {
                          this.state.res.tests.map((test, index) => (
                            <Grid container>
                              <ListItem divider>
                                <Grid item xs={5}>
                                  <ListItemText>
                                    {index}
                                  </ListItemText>
                                </Grid>
                                <Grid item xs={5}>
                                  <ListItemText>
                                    {test.weight}
                                  </ListItemText>
                                </Grid>
                                <Grid item xs={2}>
                                  <ListItemText>
                                    <Button size={'small'} className={!test.success ? classes.red : classes.green}>{!test.success ? 'Провалено' : 'Принято'}</Button>
                                  </ListItemText>
                                </Grid>
                              </ListItem>
                            </Grid>
                          ))
                        }
                      </List>
                    </List>
                  )
                }
              </div>
            )
          }
        </Paper>
      </div>
    );
  }
}

StudentTaskDropDown.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  taskId: state.studentTasks.tasksList[0].taskId,
});

export default connect(mapStateToProps)(withStyles(styles)(StudentTaskDropDown));
