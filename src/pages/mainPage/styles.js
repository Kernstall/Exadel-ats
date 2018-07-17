import Common from '../../common/Styles/Common';

const styles = ({
  ...Common,
  contentDisplay: {
    display: 'flex',
    'flex-wrap': 'wrap-reverse',
    'justify-content': 'center',
  },
  fullWidth: {
    width: '100%',
  },
  margin: {
    margin: '20px auto',
  },
  topStudentsWrapper: {
    'margin-right': '20px',
    'flex-grow': '1',
  },
});

export default styles;
