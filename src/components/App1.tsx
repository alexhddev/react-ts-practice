import React from "react";

const ArrowFunctionComponent = () => {
  console.log('Rendering ArrowFunctionComponent');
  return <div>ArrowFunctionComponent</div>;
};

// recommended for TypeScript
function FunctionComponent () {
  console.log('Rendering FunctionComponent');
  return <div>FunctionComponent</div>;
}

// Legacy
class ClassComponent extends React.Component {
  render() {
    console.log('Rendering ClassComponent');
    return <div>ClassComponent</div>;
  }
}

function App1() {
  return (
    <div className="App">
      app works 
      <br />
      <ArrowFunctionComponent />
      <br />
      <FunctionComponent />
      <br />
      <ClassComponent />
      <br />
    </div>
  );
}

export default App1;
