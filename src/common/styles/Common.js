const Common = ({
  font: {
    fontSize: '0.8em',
    fontWeight: '300',
  },
  centerScreen: {
    width: '70%',
    margin: '0 auto',
  },
  '@media (max-width: 500px)': {
    centerScreen: {
      width: '95%',
      margin: '0 auto',
    },
  },
  center: {
    margin: 'auto',
    color: 'whitesmoke',
    width: 'fit-content',
    height: 'fit-content',
  },
  flex: {
    display: 'flex',
  },
  '@global': {
    body: {
      overflowX: 'hidden',
      minWidth: '100%',
    },
    '*::-webkit-scrollbar': {
      width: '5px',
      background: 'rgba(0, 0, 0, 0.05)',
    },
    '*::-webkit-scrollbar-thumb:hover': {
      background: '#5d5d5d',
    },
    '*::-webkit-scrollbar-thumb': {
      width: '5px',
      background: '#5d5d5d50',
      borderRadius: '3px',
    },
  },
});

export default Common;
