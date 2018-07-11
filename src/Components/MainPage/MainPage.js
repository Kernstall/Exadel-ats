import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import LoginForm from '../LoginForm/LoginForm';
import TabComponent from '../TabComponent/TabComponent';
import TopStudents from '../Top/TopStudents';
import Common from '../../Styles/Common';

const styles = ({
  ...Common,
  fullWidth: {
    width: '100%',
  },
  margin: {
    margin: '20px auto',
  },
});

const Tops = [
  {
    TopBy: 'Score',
    Students: ['Sasha', 'Misha', 'Bill', 'Andry'],
  },
  {
    TopBy: 'Tasks',
    Students: ['Another Sasha', 'Another Misha', 'Another Bill', 'Another Andry'],
  },
];

const MainPage = ({ classes }) => (
  <div className={[classes.flex, classes.centerScreen, classes.margin].join(' ')}>
    {console.log(Tops[0].Students, Tops[0].TopBy, Tops)}

   {/* {
      [
        Tops.map((element) => ({
          tabName: element.TopBy,
          component: <TopStudents topScoreStudentName={['Sasha', 'Misha']} />,
        }))
      ]
    }*/}


    <TabComponent
      tabHeaders={[
        {
          tabName: Tops[0].TopBy,
          component: <TopStudents topScoreStudentName={['Sasha', 'Misha']} />,
        },
        {
          tabName: 'Header',
          component: <TopStudents topScoreStudentName={['Sasha', 'Misha']} />,
        },
      ]}

    />

    {/* <Parent child={<Child child={
      ['111', '222', '333'].map(
        (element, index) => (
          <SonOfaSon string={element} />
        )
      )
    } />}
    /> */}
    {/* <TabComponent
      tabHeaders={[
        {
          tabName: 'Header',
          component: <TopStudents topScoreStudentName={['Sasha', 'Misha']} />,
        },
        {
          tabName: 'Header',
          component: <TopStudents topScoreStudentName={['Sasha', 'Misha']} />,
        },
      ]}
    /> */}

    <LoginForm />
  </div>
);

export default withStyles(styles)(MainPage);

// tabHeaders={[
//   {
//     tabName: 'Header',
//     component: <TopStudents topScoreStudentName={['Sasha', 'Misha']} />,
//   },
//{
//     tabName: 'Header',
//     component: <TopStudents topScoreStudentName={['Sasha', 'Misha']} />,
//   },
// ]}


const Parent = ({ child }) => (
  <div>
    <h1>{child}</h1>
  </div>
);

const Child = ({ child }) => (
  <div>
    <h3>{child}</h3>
  </div>
);

const SonOfaSon = ({ string }) => (
  <div>
    <h6>{string}</h6>
  </div>
);
