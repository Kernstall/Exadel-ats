import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import TabComponent from '../tabComponent/TabComponent.jsx';
import Common from '../styles/Common';
import AttemptCode from './AttemptCode';
import { getAttemptCode } from '../../commands/attemptCode';

const styles = ({
  ...Common,
  fullWidth: {
    width: '100%',
  },
  margin: {
    margin: '20px auto',
  },
});

const codeInfo = [
  {
    name: 'test1',
    extension: 'java',
    code: 'function createChildren(style, useInlineStyles) {\n'
    + '  let childrenCount = 0;\n'
    + '  return children => {\n'
    + '    childrenCount += 1;\n'
    + '    return children.map((child, i) => createElement({\n'
    + '      node: child,\n'
    + '      style,',
  },
  {
    name: 'test2',
    extension: 'cpp',
    code: 'type, tagName, value } = node;\n'
    + '  if (type === "text") {\n'
    + '    return value;\n'
    + '  } else if (tagName) {\n'
    + '    const TagName = tagName;\n'
    + '    const childrenCreator = createChildren(style, useInlineStyles);\n'
    + '    const props = (\n'
    + '      useInlineStyles',
  },
];

const TabHeaders = [];

class AttemptFiles extends React.Component {
  componentDidMount() {
    this.props.getAttemptCode({
      taskId: '5b45b16f75224332745f7595',
      attemptNumber: this.props.match.params.attemptNumber,
    });
  }

  render() {
    const { classes, attemptCode } = this.props;
    return (
      <div className={[classes.flex, classes.centerScreen, classes.margin].join(' ')}>
        {

          attemptCode.forEach((code) => {
            TabHeaders.push({
              tabName: `${code.name}.${code.extension}`,
              component: <AttemptCode codeString={code.code} lang={code.extension} />,
            });
          })
         }
        <TabComponent
          tabHeaders={TabHeaders}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  // isLoading: state.tasksList.isLoading,
  attemptCode: state.attemptCode.attemptCode,
});

const mapCommandsToProps = dispatch => ({
  getAttemptCode: param => dispatch(getAttemptCode(param)),
});

const styled = withStyles(styles)(AttemptFiles);

export default connect(mapStateToProps, mapCommandsToProps)(styled);
