//CRA's Jest transform builds SVG components as pre-React-19 elements, which React 19 won't render,
//so tests map every .svg import to this stub instead (see "jest" in package.json)
export const ReactComponent = (props) => <svg {...props} />;

export default 'svgMock.svg';
