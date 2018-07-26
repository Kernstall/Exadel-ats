import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/styles/hljs';
import TabComponent from '../tabComponent/TabComponent.jsx';
import StudentTabTasksList from './StudentTabTasksList.jsx';
import StudentTabTestsList from './StudentTabTestsList.jsx';
import StudentTabHistory from './StudentTabHistory.jsx';
import Common from '../styles/Common';
import AttemptCode from './AttemptCode';

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
  render() {
    const { classes } = this.props;
    return (
      <div className={[classes.flex, classes.centerScreen, classes.margin].join(' ')}>
        {

           codeInfo.forEach((code) => {
             TabHeaders.push({
               tabName: `${code.name}.${code.extension}`,
               component: <AttemptCode codeString={code.code} />,
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

export default withStyles(styles)(AttemptFiles);
